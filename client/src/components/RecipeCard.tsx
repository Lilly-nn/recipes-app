import { RecipeType } from "../types/RecipeType";
import { Link, useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

export default function RecipeCard(props: RecipeType) {
  const { pathname } = useLocation();
  const canDelete = pathname.includes("my-recipes");

  async function deleteRecipe(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    const deleteAccepted = window.confirm(
      "Do you really want to delete this recipe?"
    );
    if (deleteAccepted) {
    }
  }

  return (
    <Link to={`/recipes/${props._id}`} className="card">
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
    </Link>
  );
}
