import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
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
