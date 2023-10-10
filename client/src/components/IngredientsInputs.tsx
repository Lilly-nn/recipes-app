import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
type RecipeData = {
  title: string;
  description: string;
  timeToMake: string;
  ingredients: string[];
  tags: string[];
  image: string | ArrayBuffer | null;
};
type Props = {
  recipeData: RecipeData;
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
};

export default function IngredientsInputs({
  recipeData,
  setRecipeData,
}: Props) {
  const [ingredient, setIngredient] = useState("");

  function addIngredient() {
    if (ingredient.trim() === "") return;
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, ingredient],
    });
    setIngredient("");
  }

  function deleteIngredient(ingredient: string) {
    const filtered = recipeData.ingredients.filter((el) => el !== ingredient);
    setRecipeData({
      ...recipeData,
      ingredients: filtered,
    });
  }
  return (
    <>
      <div className="flex gap-6 items-center">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addIngredient();
            }
          }}
          className="input w-[200px]"
          autoComplete="off"
          type="text"
          placeholder="ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button
          className="bg-orange-300 mt-2 py-2 px-8 hover:bg-orange-400 text-white rounded-md"
          type="button"
          onClick={addIngredient}
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 mt-4 flex-wrap">
        {recipeData.ingredients.length > 0 &&
          recipeData.ingredients.map((ingredient) => (
            <div
              key={ingredient + Math.random()}
              className="flex gap-2 items-center"
            >
              <input
                required
                className="input w-[130px] text-center rounded-md !text-gray-500"
                readOnly
                type="text"
                value={ingredient}
              />
              <button onClick={() => deleteIngredient(ingredient)}>
                <AiOutlineCloseCircle className="text-xl text-gray-300 mt-2 hover:text-gray-500" />
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
