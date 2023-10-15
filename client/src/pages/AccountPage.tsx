import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config/swr.config";
import axios from "../config/axios.config";
import { UserData } from "../types/userInfo";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";
import useCheckAuthorized from "../hooks/useCheckAuthorized";
import { useTranslation } from "react-i18next";

export default function AccountPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, error, isLoading } = useSWR(`/get-profile/${id}`, fetcher);
  const user: UserData = data?.user;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [valueChanged, setValueChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const registerDate =
    user?.createdAt && new Date(user.createdAt).toLocaleDateString();

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        city: user.city,
      });
    }
  }, [user?.name, user?.city]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValueChanged(true);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  async function updateInfo() {
    try {
      setIsUpdating(true);
      const res = await axios.post("/update-profile", {
        id: user._id,
        name: userInfo.name,
        city: userInfo.city,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  }

  useCheckAuthorized();

  return (
    <section className="section">
      <h6 className="section__title ">{t("section_title.profile")}</h6>
      <div className="mt-8 ">
        {!isLoading && user && (
          <div className="text-lg flex flex-col gap-y-4">
            <p className="flex gap-x-2 items-center">
              {t("profile.name")}:
              <input
                type="text"
                className="profile-input"
                name="name"
                value={userInfo?.name || ""}
                onChange={onChange}
                readOnly={!user.isActivated}
              />
            </p>
            <div>
              <p className="flex gap-x-2 items-center">
                {t("profile.email")}:
                <input
                  type="text"
                  className="profile-input"
                  value={user.email}
                  readOnly
                />
              </p>
              <div className="flex flex-col gap-y-4 my-3">
                {" "}
                <p className="flex gap-x-2 items-center">
                  {t("profile.city")}:
                  <input
                    name="city"
                    type="text"
                    className="profile-input"
                    onChange={onChange}
                    value={userInfo?.city || ""}
                    readOnly={!user.isActivated}
                  />
                </p>
                <p className="flex gap-x-2 items-center">
                  {t("profile.registered")}:
                  <input
                    type="text"
                    className="profile-input focus:outline-none border-none cursor-auto"
                    value={registerDate}
                    readOnly
                  />
                </p>
              </div>

              {!user.isActivated && (
                <>
                  <p className="text-sm text-red-400 italic mt-1">
                    Please activate your account via{" "}
                    <a
                      href="https://mail.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base underline underline-offset-2 hover:text-green-400"
                    >
                      link
                    </a>{" "}
                    on your email
                  </p>
                  <p className="text-sm text-gray-300">
                    (to be able to update your profile info)
                  </p>
                </>
              )}
            </div>
            <button
              onClick={updateInfo}
              type="button"
              disabled={!user.isActivated || !valueChanged || isUpdating}
              className="w-fit border hover:bg-indigo-400 hover:text-white text-gray-400 disabled:text-gray-200 disabled:border-gray-200 hover:disabled:bg-white border-indigo-400 py-2 px-6 text-base rounded-md"
            >
              {!isUpdating ? t("profile.update") : t("profile.updating")}
            </button>
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
      {isLoading && (
        <span>{t("loading.fetching", { data: "account data" })}</span>
      )}
      {!isLoading && error && <span>{error.message}</span>}
    </section>
  );
}
