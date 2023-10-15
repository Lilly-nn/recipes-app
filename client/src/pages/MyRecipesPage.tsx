import { Link, useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";
import { RecipeType } from "../types/RecipeType";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MyRecipesPage() {
  const { id } = useParams();
  const { recipes, loading, error } = useFetchRecipes(`/get-created/${id}`);
  const [myRecipes, setMyRecipes] = useState<RecipeType[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setMyRecipes(recipes);
  }, [loading]);

  return (
    <section className="section">
      <h6 className="section__title ">{t("section_title.recipes")}</h6>
      <div className="mt-5 flex gap-3 flex-wrap">
        {!loading &&
          myRecipes.length > 0 &&
          myRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipes={myRecipes}
              setRecipes={setMyRecipes}
              {...recipe}
            />
          ))}
      </div>
      {loading && (
        <span>{t("loading.fetching", { data: "your recipes" })}</span>
      )}
      {!loading && error && <span>{error}</span>}
      {!loading && !recipes.length && (
        <div>
          <p className="text-gray-400 text-lg">no created recipes yet...</p>
          <p className="text-xl text-gray-500 italic mt-2">
            To create a recipe follow this{" "}
            <Link
              to={`/create-recipe/${id}`}
              className="hover:underline text-gray-800"
            >
              link
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
