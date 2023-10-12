import { useRef, useState } from "react";
import { checkIfImage } from "../utils/checkFiletype";
import { convertToBase64 } from "../utils/convertion";
type RecipeData = {
  title: string;
  description: string;
  timeToMake: string;
  ingredients: string[];
  tags: string[];
  image: string | ArrayBuffer | null;
};
type Props = {
  recipeData: RecipeData;
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
};

export default function FileInput({ recipeData, setRecipeData }: Props) {
  const [imgFile, setImgFile] = useState<any>();
  const ref = useRef<HTMLInputElement>(null);

  async function fileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file: any = e.target.files && e.target.files[0];
    const validInput = checkIfImage(file);
    if (!validInput) return;
    setImgFile(file);

    const converted = await convertToBase64(file);
    setRecipeData({
      ...recipeData,
      image: converted,
    });
  }

  return (
    <div className="mb-4 mt-1">
      <label className="input-label">Choose image preview</label>
      <div
        onClick={() => ref.current?.click()}
        className="py-2 px-5 mt-1 text-gray-400 hover:cursor-pointer hover:bg-indigo-300 hover:text-white  border-indigo-300 w-fit border-2 rounded-md"
      >
        {!imgFile ? "Choose a file" : "preview chosen"}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={fileInput}
      />
    </div>
  );
}
