import { Link } from "react-router-dom";

export default function HomePage() {
  const signedIn = false;
  return (
    <section className="section">
      <h4 className="section__title">Home page</h4>
      <div className="flex justify-between mt-4 items-center gap-x-4">
        <input
          className="flex-1 p-4 focus:outline-slate-200 text-gray-500"
          type="text"
          placeholder="Search recipes by name.. "
        />
        {signedIn ? (
          <span>g</span>
        ) : (
          <div>
            <Link to="/sign-in">Sign in</Link>
            {"/"}
            <Link to="/sign-up">Sign up</Link>
          </div>
        )}
      </div>
    </section>
  );
}
