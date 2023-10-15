import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { MdManageAccounts, MdOutlineFavorite } from "react-icons/md";
import { PiBowlFoodBold } from "react-icons/pi";
import { BiMessageSquareAdd } from "react-icons/bi";
import axios from "../config/axios.config";
import { authorized } from "../state";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

export default function AsideBar() {
  const [signedIn, setSignedIn] = useRecoilState(authorized);
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function signOut() {
    setSignedIn(false);
    localStorage.removeItem("user_id");
    await axios.post("/api/auth/sign-out");
    navigate("/");
  }
  return (
    <aside className="py-6 px-8 w-[300px] fixed">
      <Link to="/" className="text-3xl font-bold">
        Cookz
      </Link>
      <div className="flex flex-col gap-y-4 mt-6">
        <Link to="/" className="link">
          <AiTwotoneHome />
          {t("sideBar.home")}
        </Link>
        {!signedIn ? (
          <div className="flex">
            <Link
              to="/sign-in"
              className="text-xl transition-all underline-offset-2  hover:text-blue-950 hover:underline"
            >
              {t("sideBar.signIn")}
            </Link>
            /
            <Link
              to="/sign-up"
              className="text-xl underline-offset-2 transition-all hover:text-blue-950 hover:underline"
            >
              {t("sideBar.signUp")}
            </Link>
          </div>
        ) : (
          <>
            <Link
              to={`/account/${localStorage.getItem("user_id")}`}
              className="link"
            >
              <MdManageAccounts />
              {t("sideBar.account")}
            </Link>

            <Link
              to={`/favourites/${localStorage.getItem("user_id")}`}
              className="link"
            >
              <MdOutlineFavorite />
              {t("sideBar.liked")}
            </Link>
            <Link
              to={`/my-recipes/${localStorage.getItem("user_id")}`}
              className="link"
            >
              <PiBowlFoodBold />
              {t("sideBar.myrecipes")}
            </Link>
            <Link
              to={`/create-recipe/${localStorage.getItem("user_id")}`}
              className="link"
            >
              <BiMessageSquareAdd />
              {t("sideBar.create")}
            </Link>
            <button onClick={signOut} type="button" className="link text-start">
              {t("sideBar.logout")}
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
