import { useParams } from "react-router-dom";
import axios from "../config/axios.config";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";
import { getErrorMessage } from "../utils/getApiError";

export default function MyRecipesPage() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getRecipes() {
    try {
      setError(null);
      const res = await axios.get(`/get-created/${id}`);
      const { recipes } = res.data;
      setRecipes(recipes);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

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
