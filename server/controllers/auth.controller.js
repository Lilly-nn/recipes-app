import UserModel from "../DB/models/UserModel.js";
import { registrationSchema } from "../validation/authValidation.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const requestData = req.body;
    //validate data from the client
    const result = registrationSchema.safeParse({ ...requestData });
    if (result.error) {
      return res.status(400).json(result.error);
    }

    //check if user exists
    const userExists = await UserModel.findOne({ email: requestData.email });
    if (userExists) {
      return res
        .status(403)
        .json({ message: "User with such account already exists" });
    }

    const hashedPassword = await bcrypt.hash(requestData.password, 8);
    delete requestData.confirmPassword;
    const userData = {
      ...requestData,
      password: hashedPassword,
    };

    const user = new UserModel(userData);
    await user.save();

    return res.status(200).json({
      message: "User was Succesfully registered",
    });
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (req, res) => {};
