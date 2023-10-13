import { useParams } from "react-router-dom";
import axios from "../config/axios.config";
import { Comment } from "../types/RecipeType";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";

type CommentProps = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comment: Comment;
};

export default function UserComment({
  comment,
  comments,
  setComments,
}: CommentProps) {
  const currentId = localStorage.getItem("user_id");
  const isAuthor = currentId === comment.userId;
  const recipeId = useParams().id;

  async function deleteComment() {
    const canDelete = window.confirm("You really want to delete?");
    if (!canDelete) return;
    try {
      await axios.post("/recipes/delete-comment", {
        commentId: comment._id,
        recipeId,
      });
      const filteredComments = comments.filter((el) => el._id !== comment._id);
      setComments(filteredComments);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
  return (
    <div className="relative">
      {isAuthor && (
        <AiOutlineDelete
          onClick={deleteComment}
          className="absolute right-0 cursor-pointer  text-gray-600"
        />
      )}
      <span className="text-gray-900">@{comment.username}</span>
      <p className="text-indigo-600">{comment.text}</p>
      <Toaster position="bottom-center" />
    </div>
  );
}
