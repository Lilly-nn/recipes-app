import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ingredients: {
      type: Array,
      required: true,
      default: undefined,
    },
    tags: {
      type: Array,
      required: true,
      default: undefined,
    },
    timeToMake: {
      type: String,
      required: [true, "Please specify the time"],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const RecipeModel =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default RecipeModel;
