import RecipeModel from "../DB/models/RecipeModel.js";
import UserModel from "../DB/models/UserModel.js";

export const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    const recipe = new RecipeModel(recipeData);
    await recipe.save();
    return res.status(200).json({ message: "Succesfully created" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getAllRecipes = async (req, res) => {
  const recipes = await RecipeModel.find({});
  if (!recipes) {
    return res.status(404).json({ message: "no recipes were created yet" });
  }
  return res.status(200).json({ recipes });
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.findById(id);
  if (!recipe) {
    return res.status(404).json({ message: "Oops, such recipe doesn't exist" });
  }
  return res.status(200).json({ recipe });
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.body;
  const deleted = await RecipeModel.findByIdAndDelete(id);
  if (deleted) {
    return res.status(200).json({ message: "Deleted succesfully" });
  } else {
    return res.status(500).json({ message: "Something went wrong..." });
  }
};

export const likeRecipe = async (req, res) => {
  const { userId, recipeData } = req.body;
  const recipe = await RecipeModel.findById(recipeData._id);
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  const exists = recipe.likes.some((el) => el.valueOf === user._id.valueOf);
  if (!exists) {
    recipe.likes.push(user._id);
    user.liked.push(recipeData);
  } else {
    recipe.likes = recipe.likes.filter((el) => el.valueOf !== user._id.valueOf);
    user.liked = user.liked.filter((el) => el._id !== recipeData._id);
  }
  await recipe.save();
  await user.save();
  return res.status(200);
};
