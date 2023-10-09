import { useParams } from "react-router-dom";
import axios from "../config/axios.config";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";
import { getErrorMessage } from "../utils/getApiError";
import useFetchAuthor from "../hooks/useFetchAuthor";

export default function RecipePage() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<RecipeType | null>(null);
  const [error, setError] = useState("");
  const { authorData } = useFetchAuthor(recipeData);
  console.log(authorData);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(`recipes/get-recipe/${id}`);
        const { recipe } = res.data;
        setRecipeData(recipe);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }

    fetchRecipe();
  }, [id]);

  return (
    <section className="section bg-gray-100 min-h-screen p-8">
      {error && <span>{error}</span>}
      <div className="text-blue-300">
        <div className="recipe-header relative w-[300px]">
          <img
            src="https://media.istockphoto.com/id/1175434591/photo/fried-rice-with-ketchup-and-soy-sauce.jpg?s=612x612&w=0&k=20&c=h4PypFpU_ktxXBGlw6P-K6t6WfDeJ6PMcCEXb7rwxqk="
            alt="recipe"
            className="w-[300px] h-[300px] rounded-full bg-gray-600 object-cover"
          ></img>
          <h6 className="title absolute bottom-10 tracking-wide right-[-80px] bg-white p-3 uppercase text-3xl">
            {recipeData?.title}
          </h6>
        </div>
        <div className="info flex text-lg mt-8">
          <div className="detais w-[50%] ">
            <div>
              <p className="text-gray-500">
                Time to make: {recipeData?.timeToMake}
              </p>
              <p className="text-gray-500">Author: {authorData?.name}</p>
            </div>
            <div className="text-center mt-2">
              <span className="text-xl font-bold text-blue-400 inline-block mb-2 mt-2">
                Ingredients
              </span>
              <p className="flex flex-col gap-y-1">
                {recipeData?.ingredients.map((recipe) => (
                  <span key={recipe + Math.random()}>{recipe}</span>
                ))}
              </p>
            </div>
          </div>

          <div className="description w-[50%]">
            <span className="text-xl font-bold text-blue-400 inline-block mb-3">
              Description:
            </span>
            <p>{recipeData?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
