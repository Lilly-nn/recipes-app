import UserModel from "../DB/models/UserModel.js";
import bcrypt from "bcrypt";

export const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  const currentUserId = user._id.valueOf();
  const { user_id } = req.cookies;
  const validUser = await bcrypt.compare(currentUserId, user_id);
  if (!validUser) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
