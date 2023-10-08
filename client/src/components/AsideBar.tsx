import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { MdManageAccounts, MdOutlineFavorite } from "react-icons/md";
import { PiBowlFoodBold } from "react-icons/pi";
import { BiMessageSquareAdd } from "react-icons/bi";

export default function AsideBar() {
  return (
    <aside className="py-6 px-8 w-[300px] fixed">
      <Link to="/" className="text-3xl font-bold">
        Cookz
      </Link>
      <div className="flex flex-col gap-y-4 mt-6">
        <Link to="/" className="link">
          <AiTwotoneHome />
          Home
        </Link>
        <Link to="/account" className="link">
          <MdManageAccounts />
          Account
        </Link>
        <Link to="/favourites" className="link">
          <MdOutlineFavorite />
          Favourites
        </Link>
        <Link to="/created-recipes" className="link">
          <PiBowlFoodBold />
          My recipes
        </Link>
        <Link to="/create-recipe" className="link">
          <BiMessageSquareAdd />
          Create recipe
        </Link>
        <button type="button" className="link text-start">
          Logout
        </button>
      </div>
    </aside>
  );
}
