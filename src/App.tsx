import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<PasswordResetPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
