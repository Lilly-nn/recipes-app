import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";

export default function HomePage() {
  const { recipes, loading, error } = useFetchRecipes(`/recipes/get-all`);

  return (
    <section className="section">
      <h4 className="section__title">Home page</h4>
      <div className="flex flex-col justify-between mt-4  gap-x-4">
        <input
          className=" p-4 focus:outline-slate-200 text-gray-500"
          type="text"
          placeholder="Search recipes by name.. "
        />
        <div className="mt-6 flex gap-3 flex-wrap">
          {!loading &&
            recipes.length > 0 &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id} {...recipe} />
            ))}
        </div>
        {loading && <span>Fetching recipes...</span>}
        {!loading && error && <span>{error}</span>}
      </div>
    </section>
  );
}
