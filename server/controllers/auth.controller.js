import UserModel from "../DB/models/UserModel.js";
import { registrationSchema } from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { sendActivationLink } from "../services/mail.service.js";

export const register = async (req, res) => {
  try {
    const requestData = req.body;
    //validate data from client
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
    const activationLink = uuidv4();
    delete requestData.confirmPassword;
    const userData = {
      ...requestData,
      activationLink,
      password: hashedPassword,
    };

    const user = new UserModel(userData);
    await user.save();
    await sendActivationLink(
      requestData.email,
      `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`
    );

    return res.status(200).json({
      message: "User was Succesfully registered",
    });
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email or password were not provided" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Such account doesn't exist" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Couldn't authorize" });
  }
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  const hashedId = await bcrypt.hash(user._id.toString(), 5);
  res.cookie("user_id", hashedId, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(200).json({ user, token });
};

export const activate = async (req, res) => {
  const activationLink = req.params.link;
  const user = await UserModel.findOne({ activationLink });
  if (!user) {
    return res.status(400).json({ message: "Invalid activation link" });
  }
  user.isActivated = true;
  await user.save();
  return res.redirect(process.env.CLIENT_URL);
};

export const signOut = async (req, res) => {
  res.clearCookie("user_id");
};
