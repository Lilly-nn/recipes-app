import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";
import { authorized } from "../state";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

export default function SignInPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useRecoilState(authorized);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/sign-in", { ...formData });
      if (res.status === 200) {
        setSignedIn(true);
        localStorage.setItem("user_id", res.data.user._id);
        navigate("/");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <h6 className="section__title">{t("sideBar.signIn")}</h6>
      <form onSubmit={signIn} className="flex flex-col gap-4 mt-12">
        <label className="input-label">
          {t("sign-up.email")}
          <input
            onChange={onChange}
            autoComplete="off"
            name="email"
            className="input"
            type="email"
          />
        </label>
        <label className="input-label">
          {t("sign-up.password")}
          <input
            onChange={onChange}
            name="password"
            className="input"
            type="password"
          />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing in..." : t("sign-up.sign_in")}
        </button>
        <Toaster position="bottom-center" />
      </form>
    </section>
  );
}
