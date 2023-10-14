import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../config/axios.config";
import { RecipeType } from "../types/RecipeType";
import RecipeCard from "../components/RecipeCard";
import { getErrorMessage } from "../utils/getApiError";

export default function LikedRecipes() {
  const { id } = useParams();
  const [likedRecipes, setLikedRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <h6 className="section__title">Liked</h6>
      <div className="mt-5 flex gap-3 flex-wrap">
        {likedRecipes.length > 0 &&
          likedRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        {!likedRecipes.length && !error && !loading && (
          <p>You haven't liked any recipe yet..</p>
        )}
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
      </div>
    </section>
  );
}
