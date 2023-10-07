import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignInPage";
import SignInPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import AsideBar from "./components/AsideBar";

function App() {
  return (
    <Router>
      <AsideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
