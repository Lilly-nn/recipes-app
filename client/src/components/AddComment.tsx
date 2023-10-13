import { useState } from "react";
import axios from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";
import { Comment } from "../types/RecipeType";

export default function AddComment({
  recipeId,
  userId,
  comments,
  setComments,
}: {
  recipeId: string | undefined;
  userId: string | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function addComment() {
    try {
      setLoading(true);
      const res = await axios.post("/recipes/add-comment", {
        comment: text,
        userId,
        recipeId,
      });
      setComments([...comments, res.data]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
      setText("");
    }
  }

  return (
    <>
      <button
        className="block mt-4 text-gray-600"
        onClick={() => setIsVisible(!isVisible)}
      >
        Add comment...
      </button>
      {isVisible && (
        <div className="mt-4 flex flex-col items-end">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave your comment"
            className="w-full rounded-sm min-h-[200px] max-h-[250px] focus:outline-blue-100 p-2 text-lg"
          />

          <button
            disabled={!text.trim().length || loading}
            type="button"
            onClick={addComment}
            className="btn mt-2"
          >
            {loading ? "Loading.. " : "Add comment"}
          </button>
          <Toaster position="bottom-center" />
        </div>
      )}
    </>
  );
}
