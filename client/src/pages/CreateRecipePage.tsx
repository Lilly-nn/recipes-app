import axios from "../config/axios.config";

export default function CreateRecipePage() {
  return (
    <div className="ml-[300px]">
      CreateRecipePage <button onClick={createRecipe}>create</button>
    </div>
  );
}
