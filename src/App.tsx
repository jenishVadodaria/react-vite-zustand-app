import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import PrivateRoutes from "./components/PrivateRoutes";

import LoginPage from "./pages/login/LoginPage";
import PeoplePage from "./pages/people/PeoplePage";
import PeopleDetailPage from "./pages/people/PeopleDetailPage";
import { useAuthData } from "./store/auth.store";

export default function App() {
  const { authData } = useAuthData();

  const isAuthenticated = authData.access_token !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/people" />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:name/:id" element={<PeopleDetailPage />} />
        </Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/people" /> : <LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
