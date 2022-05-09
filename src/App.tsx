import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "components/AppBar";
import HomePage from "pages/HomePage";
import PublicPage from "pages/PublicPage/PublicPage";
import TestPage from "./pages/testPage";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import SendProposal from "pages/SendProposal";

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PublicPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forgotten_password" element={<ForgotPassword />} />
        <Route path="/reset_password/*" element={<ResetPassword />} />
        <Route path="/send_proposal/*" element={<SendProposal />} />
      </Routes>
    </>
  );
};

export default App;
