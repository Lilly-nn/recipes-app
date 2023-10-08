import { useState } from "react";
import axios from "../config/axios.config";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Select, MenuItem, Box, Chip } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { culinaryTags } from "../info/culinaryTags";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function CreateRecipePage() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    timeToMake: "",
    ingredients: [] as string[],
    tags: [] as string[],
  });

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

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  }

  function selectOnChange(event: SelectChangeEvent<typeof recipeData.tags>) {
    const {
      target: { value },
    } = event;
    setRecipeData({
      ...recipeData,
      tags: typeof value === "string" ? value.split(",") : value,
    });
  }

  async function createRecipe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title, description, timeToMake, tags, ingredients } = recipeData;
    if (
      !title.trim() ||
      !description.trim() ||
      !timeToMake.trim() ||
      !tags.length ||
      !ingredients.length
    ) {
      alert("Fill out all fields");
      return;
    }
    if (description.length < 90) {
      alert("Description should be larger, please specify more details");
      return;
    }
    e.currentTarget.reset();
    setRecipeData({
      ...recipeData,
      ingredients: [],
    });
    try {
      setLoading(false);
      await axios.post(`/recipes/create-recipe/${id}`, {
        ...recipeData,
        authorId: localStorage.getItem("user_id"),
      });
      toast.success("Recipe created");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create a recipe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <h6 className="section__title">Create a recipe</h6>
      <form onSubmit={createRecipe} className="flex flex-col gap-4 mt-12">
        <label className="input-label">
          Recipe Title
          <input
            required
            className="input"
            autoComplete="off"
            type="text"
            name="title"
            onChange={onChange}
          />
        </label>
        <label className="input-label">
          Description (steps to make)
          <textarea
            required
            className="input max-h-[70vh] min-h-[200px]"
            name="description"
            onChange={onChange}
          />
        </label>
        <label className="input-label">
          Time to make(1 hour, 30 minutes, 15m, 1h 20m )
          <input
            required
            className="input"
            autoComplete="off"
            type="text"
            name="timeToMake"
            onChange={onChange}
          />
        </label>
        <div className="">
          <label className="input-label">
            Ingredients (50g butter, 3 eggs)
          </label>
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
          <div>
            <label className="input-label">Tags</label>

            <Select
              multiple
              placeholder="Choose relevant tags"
              onChange={selectOnChange}
              value={recipeData.tags}
              renderValue={(tags) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {tags.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Choose relevant tags</em>
              </MenuItem>
              {culinaryTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-6 rounded-md text-orange-600 w-[200px] border border-orange-400 hover:bg-orange-400 hover:text-white disabled:bg-orange-300 disabled:text-white disabled:border-none transition-colors focus:outline-orange-500"
        >
          {loading ? "creating..." : "create recipe"}
        </button>
      </form>
      <Toaster position="bottom-center" />
    </section>
  );
}
