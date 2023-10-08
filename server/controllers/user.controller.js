import RecipeModel from "../DB/models/RecipeModel.js";

export const getProfile = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "Succesfully fetched",
  });
};

export const getUserRecipes = async (req, res) => {
  const { id: userId } = req.params;
  const recipes = await RecipeModel.find({ authorId: { $eq: userId } });
  return res.status(200).json({ recipes });
};

export const getLikedRecipes = async (req, res) => {};
