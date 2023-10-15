import { useState } from "react";
import axios from "../config/axios.config";
import { UserInfo } from "../types/userInfo";
import { validateInputs } from "../utils/validateInputs";
import { registerErrors } from "../types/validation";
import { getErrorMessage } from "../utils/getApiError";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] =
    useState<registerErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const errors = validateInputs(userInfo);
      if (Object.entries(errors).length > 0) {
        setValidationErrors(errors);
        return;
      } else {
        setValidationErrors(null);
      }
      setLoading(true);
      const res = await axios.post("/api/auth/sign-up", { ...userInfo });
      if (res.status === 200) {
        toast.success("You are successfully registered");
        navigate("/sign-in");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="section">
      <h6 className="section__title">{t("sideBar.signUp")}</h6>
      <form onSubmit={signUp} className="flex flex-col gap-4 mt-12">
        <div>
          <label className="input-label">
            {t("profile.name")}
            <input
              className="input"
              autoComplete="off"
              type="text"
              name="name"
              value={userInfo.name}
              onChange={onChange}
            />
          </label>
          {validationErrors?.name && (
            <span className="input-error">{validationErrors.name}</span>
          )}
        </div>
        <div>
          <label className="input-label">
            {t("sign-up.email")}
            <input
              autoComplete="off"
              className="input"
              type="email"
              name="email"
              value={userInfo.email}
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label className="input-label">
            {t("sign-up.password")}
            <input
              className="input"
              type="password"
              name="password"
              value={userInfo.password}
              onChange={onChange}
            />
          </label>
          {validationErrors?.password && (
            <span className="input-error">{validationErrors.password}</span>
          )}
        </div>
        <div>
          <label className="input-label">
            {t("sign-up.confirm_password")}
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={onChange}
            />
          </label>
          {validationErrors?.confirmPassword && (
            <span className="input-error">
              {validationErrors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading..." : t("sign-up.sign_up")}
        </button>
        <Toaster position="bottom-center" />
      </form>
    </section>
  );
}
