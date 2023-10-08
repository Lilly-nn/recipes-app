import { useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";

export default function MyRecipesPage() {
  const { id } = useParams();
  const { recipes, loading, error } = useFetchRecipes(`/get-created/${id}`);

  return (
    <section className="section">
      <h6 className="section__title">My Recipes</h6>
      <div>
        {!loading &&
          recipes.length > 0 &&
          recipes.map((recipe) => <div key={recipe._id}>{recipe.title}</div>)}
      </div>
      {loading && <span>Fetching your recipes...</span>}
      {!loading && error && <span>{error}</span>}
    </section>
  );
}
