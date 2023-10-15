import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";
import { useTranslation } from "react-i18next";

export default function SearchInput({
  recipes,
  setFiltered,
}: {
  recipes: RecipeType[];
  setFiltered: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}) {
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();
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
      placeholder={t("placeholder.search")}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
}
