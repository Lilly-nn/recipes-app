import RecipeModel from "../DB/models/RecipeModel.js";

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