import { useState } from "react";
import axios from "../config/axios.config";
import { Select, MenuItem, Box, Chip } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { culinaryTags } from "../info/culinaryTags";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { convertToBase64 } from "../utils/convertion";
import IngredientsInputs from "../components/IngredientsInputs";
import { checkIfImage } from "../utils/checkFiletype";

export default function CreateRecipePage() {
  const { id } = useParams();
  const [imgFile, setImgFile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    timeToMake: "",
    ingredients: [] as string[],
    tags: [] as string[],
    image: "" as string | null | ArrayBuffer,
  });

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

  async function fileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file: any = e.target.files && e.target.files[0];
    const validInput = checkIfImage(file);
    if (!validInput) return;
    setImgFile(file);

    const converted = await convertToBase64(file);
    setRecipeData({
      ...recipeData,
      image: converted,
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
      e.currentTarget.reset();
    } catch (err) {
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
          <IngredientsInputs
            recipeData={recipeData}
            setRecipeData={setRecipeData}
          />
          <div>
            <label className="input-label">Choose image preview</label>
            <input type="file" required accept="image/*" onChange={fileInput} />
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
