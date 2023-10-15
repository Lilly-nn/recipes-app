import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../config/axios.config";
import { RecipeType } from "../types/RecipeType";
import RecipeCard from "../components/RecipeCard";
import { getErrorMessage } from "../utils/getApiError";
import { useTranslation } from "react-i18next";

export default function LikedRecipes() {
  const { id } = useParams();
  const [likedRecipes, setLikedRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchLiked() {
      try {
        const res = await axios.get(`/get-liked/${id}`);
        const { likedRecipes } = res.data;
        setLikedRecipes(likedRecipes);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchLiked();
  }, [id]);

  return (
    <section className="section">
      <h6 className="section__title">{t("section_title.liked")}</h6>
      <div className="mt-5 flex gap-3 flex-wrap">
        {likedRecipes.length > 0 &&
          likedRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        {!likedRecipes.length && !error && !loading && (
          <p>{t("liked.no_liked")}.</p>
        )}
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
      </div>
    </section>
  );
}
