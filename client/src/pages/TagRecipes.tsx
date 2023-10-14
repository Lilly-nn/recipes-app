import { useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";

export default function TagRecipes() {
  const { tag } = useParams();

  const { recipes, loading, error } = useFetchRecipes(
    `recipes/get-recipe/tag/${tag}`
  );
  return (
    <section className="section">
      <h6 className="section__title ">
        Recipes for tag{" "}
        <span className="lowercase italic text-gray-400">
          {tag?.toLowerCase().split("-").join(" ")}
        </span>
      </h6>
      <div className="mt-5 flex gap-3 flex-wrap">
        {recipes.length > 0 &&
          recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)}
        {!recipes.length && !error && !loading && (
          <p>No recipes found to match this tag :(</p>
        )}
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
      </div>
    </section>
  );
}
