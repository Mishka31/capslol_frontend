import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "components/AppBar";
import HomePage from "pages/HomePage";
import TestPage from "./pages/testPage";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import VerifyEmail from "pages/ForgotPassword/components/VerifyEmail";

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forgotten_password" element={<ForgotPassword />} />
        <Route path="/verify_email" element={<VerifyEmail />} />
        <Route path="/reset_password/:id" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
