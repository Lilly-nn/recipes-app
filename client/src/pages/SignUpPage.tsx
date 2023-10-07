import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../utils/getApiError";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        localStorage.setItem("user_id", res.data.user._id);
        navigate("/account");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <h6 className="section__title">Sign In</h6>
      <form onSubmit={signIn} className="flex flex-col gap-4 mt-12">
        <label className="input-label">
          Email
          <input
            onChange={onChange}
            autoComplete="off"
            name="email"
            className="input"
            type="email"
          />
        </label>
        <label className="input-label">
          Password
          <input
            onChange={onChange}
            name="password"
            className="input"
            type="password"
          />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <Toaster position="bottom-center" />
      </form>
    </section>
  );
}
