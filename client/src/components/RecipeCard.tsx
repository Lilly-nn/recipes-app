import { RecipeType } from "../types/RecipeType";
import { Link, useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import axios from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";

export default function RecipeCard(props: RecipeType) {
  const { pathname } = useLocation();
  const canDelete = pathname.includes("my-recipes");

  async function deleteRecipe(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    const deleteAccepted = window.confirm(
      "Do you really want to delete this recipe?"
    );
    if (!deleteAccepted) return;
    try {
      const res = await axios.post("/recipes/delete-recipe", {
        id: props._id,
      });
      const { message } = res.data;
      toast.success(message);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <Link to={`/recipes/${props._id}`} className="card">
      <img
        src={
          props.image ||
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        }
        alt={props.title}
        className="card__img"
      />
      <div className="card__details">
        <h6 className="card__title">{props.title}</h6>
        <span className="card__time">{props.timeToMake}</span>
        <div className="card__tags">
          {props.tags.length > 0 &&
            props.tags.map((tag) => <p key={tag}>{tag}</p>)}
        </div>
        <span className="card__likes">likes: {props.likes.length}</span>
        {canDelete && (
          <AiFillDelete className="delete-icon" onClick={deleteRecipe} />
        )}
      </div>
      <Toaster position="bottom-center" />
    </Link>
  );
}
