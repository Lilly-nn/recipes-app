import RecipeModel from "../DB/models/RecipeModel.js";
import UserModel from "../DB/models/UserModel.js";

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Such user doesn't exist" });
  }
  return res.status(200).json({ user });
};

export const getUserRecipes = async (req, res) => {
  const { id: userId } = req.params;
  const recipes = await RecipeModel.find({ authorId: { $eq: userId } });
  return res.status(200).json({ recipes });
};

export const getUserById = async (req, res) => {
  const { authorId: id } = req.body;
  const author = await UserModel.findById(id);
  if (!author) {
    return res.status(404).json({ message: "Undefined account" });
  }
  const authorData = {
    name: author.name,
    id: author._id,
  };
  return res.status(200).json({ author: authorData });
};

export const getLikedRecipes = async (req, res) => {};
