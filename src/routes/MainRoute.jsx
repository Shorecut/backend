import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";

const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default MainRoute;
