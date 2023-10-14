import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";

export default function SearchInput({
  recipes,
  setFiltered,
}: {
  recipes: RecipeType[];
  setFiltered: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    function filter() {
      const filteredRecipes = recipes.filter((recipe) => {
        if (!recipe.title.toLowerCase().includes(inputValue.toLowerCase())) {
          return false;
        }
        return true;
      });
      setFiltered(filteredRecipes);
    }
    filter();
  }, [inputValue.length]);

  return (
    <input
      className=" p-4 focus:outline-slate-200 text-gray-500"
      type="text"
      placeholder="Search recipes by name.. "
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
}
