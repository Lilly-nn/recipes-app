import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import axios from "../config/axios.config";
import { RecipeCardProps } from "../types/RecipeType";
import { getErrorMessage } from "../utils/getApiError";

export default function RecipeCard(props: RecipeCardProps) {
  const { pathname } = useLocation();
  const canDelete = pathname.includes("my-recipes");
  const hideLiked = pathname.includes("favourites");
  const {
    title,
    timeToMake,
    tags,
    likes,
    image,
    _id: id,
    recipes,
    setRecipes,
  } = props;

  async function deleteRecipe(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    const deleteAccepted = window.confirm(
      "Do you really want to delete this recipe?"
    );
    if (!deleteAccepted) return;
    try {
      const res = await axios.post("/recipes/delete-recipe", {
        id,
      });
      const filtered = recipes?.filter((recipe) => recipe._id !== id);

      filtered && setRecipes && setRecipes(filtered);
      const { message } = res.data;
      toast.success(message);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <Link to={`/recipes/${id}`} className="card">
      <img
        src={
          image ||
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        }
        alt={title}
        className="card__img"
      />
      <div className="card__details">
        <h6 className="card__title">{title}</h6>
        <span className="card__time">{timeToMake}</span>
        <div className="card__tags">
          {tags.length > 0 && tags.map((tag) => <p key={tag}>{tag}</p>)}
        </div>
        {!hideLiked && (
          <span className="card__likes">likes: {likes.length}</span>
        )}

        {canDelete && (
          <AiFillDelete className="delete-icon" onClick={deleteRecipe} />
        )}
      </div>
      <Toaster position="bottom-center" />
    </Link>
  );
}
