import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";
import { RecipeType } from "../types/RecipeType";
import SearchInput from "../components/SearchInput";

export default function HomePage() {
  const { recipes, loading, error } = useFetchRecipes(`/recipes/get-all`);
  const [filtered, setFiltered] = useState<RecipeType[]>([]);

  return (
    <section className="section">
      <h4 className="section__title">Home page</h4>
      <div className="flex flex-col justify-between mt-4  gap-x-4">
        <SearchInput recipes={recipes} setFiltered={setFiltered} />
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
