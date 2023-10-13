import { Link, useParams } from "react-router-dom";
import axios from "../config/axios.config";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";
import { getErrorMessage } from "../utils/getApiError";
import useFetchAuthor from "../hooks/useFetchAuthor";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

export default function RecipePage() {
  const userId = localStorage.getItem("user_id");
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<RecipeType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState("");
  const { authorData } = useFetchAuthor(recipeData);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(`recipes/get-recipe/${id}`);
        const { recipe } = res.data;
        const liked =
          recipeData && recipeData.likes.some((el) => el === userId);
        setRecipeData(recipe);
        if (liked) setIsLiked(liked);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }

    fetchRecipe();
  }, [id, recipeData?._id]);

  async function likeRecipe() {
    setIsLiked(!isLiked);
    try {
      await axios.post("/recipes/like-recipe", { userId, recipeData });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <section className="section bg-gray-100 min-h-screen p-8 relative">
      {error && <span>{error}</span>}
      {isLiked ? (
        <FcLike className="heart-svg" onClick={likeRecipe} />
      ) : (
        <FcLikePlaceholder className="heart-svg" onClick={likeRecipe} />
      )}

      <div className="text-blue-300">
        <div className="recipe-header relative w-[300px]">
          <img
            src={recipeData?.image}
            alt="recipe"
            className="w-[300px] h-[300px] rounded-full bg-gray-400 object-cover"
          ></img>
          <h6 className="title absolute bottom-[-20px] tracking-wide max-h-[85px] overflow-hidden right-[-80px] bg-white p-3 uppercase text-3xl">
            {recipeData?.title}
          </h6>
        </div>
        <div className="info flex text-lg mt-12">
          <div className="detais w-[50%] ">
            <div>
              <p className="text-gray-500">
                Time to make: {recipeData?.timeToMake}
              </p>
              <p className="text-gray-500">
                Author:
                {authorData?.name ? (
                  <Link
                    className="hover:underline"
                    to={`/recipes/author/${authorData?.id}`}
                  >
                    {authorData?.name}
                  </Link>
                ) : (
                  <span> undefined user</span>
                )}
              </p>
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
      <Toaster position="bottom-center" />
    </section>
  );
}
