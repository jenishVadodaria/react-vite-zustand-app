import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthData } from "../store/auth.store";
import Layout from "./Layout/Layout";

const PrivateRoutes = () => {
  const { authData } = useAuthData();

  const isAuthenticated = authData.access_token !== null;

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
