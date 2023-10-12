import { Link, useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipesPage() {
  const { id } = useParams();
  const { recipes, loading, error } = useFetchRecipes(`/get-created/${id}`);
  return (
    <section className="section">
      <h6 className="section__title ">My Recipes</h6>
      <div className="mt-5 flex gap-3 flex-wrap">
        {!loading &&
          recipes.length > 0 &&
          recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)}
      </div>
      {loading && <span>Fetching your recipes...</span>}
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
