import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";

export default function HomePage() {
  const { recipes, loading, error } = useFetchRecipes(`/recipes/get-all`);
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState<RecipeType[]>([]);

  useEffect(() => {
    function filter() {
      const filteredRecipes = recipes.filter((recipe) => {
        if (!recipe.title.toLowerCase().includes(inputValue)) {
          return false;
        } else {
          return true;
        }
      });
      setFiltered(filteredRecipes);
    }
    filter();
  }, [inputValue.length]);

  return (
    <section className="section">
      <h4 className="section__title">Home page</h4>
      <div className="flex flex-col justify-between mt-4  gap-x-4">
        <input
          className=" p-4 focus:outline-slate-200 text-gray-500"
          type="text"
          placeholder="Search recipes by name.. "
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div className="mt-6 flex gap-3 flex-wrap">
          {!loading && filtered.length > 0
            ? filtered.map((recipe) => (
                <RecipeCard key={recipe._id} {...recipe} />
              ))
            : recipes.map((recipe) => (
                <RecipeCard key={recipe._id} {...recipe} />
              ))}
        </div>
        {loading && <span>Fetching recipes...</span>}
        {!loading && error && <span>{error}</span>}
      </div>
    </section>
  );
}
