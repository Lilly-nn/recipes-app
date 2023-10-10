import { useParams } from "react-router-dom";
import axios from "../config/axios.config";
import { UserData } from "../types/userInfo";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getApiError";

export default function AccountPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setError(null);
        const res = await axios.get(`/get-profile/${id}`);
        const { user } = res.data;
        setUserData(user);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id]);
  return (
    <section className="section">
      <h6 className="section__title ">Profile page</h6>
      <div className="mt-5 ">
        {!loading && userData && (
          <div>
            <p>Name: {userData.name}</p>
            <div>
              <p>Email: {userData.email}</p>
              {!userData.isActivated && (
                <>
                  <p>Please activate your account via link on your email</p>
                  <p className="text-sm text-gray-300">
                    (to be able to update your profile info)
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {loading && <span>Fetching account data...</span>}
      {!loading && error && <span>{error}</span>}
    </section>
  );
}
