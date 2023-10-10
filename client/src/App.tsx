import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignInPage";
import SignInPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import AsideBar from "./components/AsideBar";
import MyRecipesPage from "./pages/MyRecipesPage";
import AuthorRecipesPage from "./pages/AuthorRecipesPage";

function App() {
  return (
    <Router>
      <AsideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/account/:id" element={<AccountPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/my-recipes/:id" element={<MyRecipesPage />} />
        <Route path="/create-recipe/:id" element={<CreateRecipePage />} />
        <Route path="/recipes/author/:id" element={<AuthorRecipesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
