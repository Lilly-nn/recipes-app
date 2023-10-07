import UserModel from "../DB/models/UserModel.js";
import bcrypt from "bcrypt";

export const validateUser = async (req, res, next) => {
  const { authorId: id } = req.body;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "Such user doesn't exist" });
  }
  const currentUserId = user._id.valueOf();
  const { user_id } = req.cookies;
  const validUser = await bcrypt.compare(currentUserId, user_id);
  if (!validUser) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
