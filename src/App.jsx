import React from "react";
import { Button } from "@chakra-ui/react";
// import { useCounterStore } from "./stores/counterStore";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RecipePage from "./pages/recipe/RecipePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Layout from "./layouts/Layout";
import DashboardLayout from "./layouts/DashboardLayout";
import SiteLayout from "./layouts/SiteLayout";
import LoginPage from "./pages/login/LoginPage";
import {
  startRecipeWatcher,
  stopRecipeWatcher,
} from "./stores/subscribeToRecipes";
import useUsersStore from "./stores/usersStore";
import { startUserWatcher, stopUserWatcher } from "./stores/subscribeToUsers";
import RequireGuest from "./guards/RequireGuest";
import RequireAuth from "./guards/RequireAuth";
import RecipeBooksPage from "./pages/recipesBooks/RecipeBooksPage";
import toast from "react-hot-toast";

function App() {
  // const { count, increment } = useCounterStore();

  const loadUser = useUsersStore((s) => s.loadUser);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  React.useEffect(() => {
    // toast.success("data loaded!");
    startRecipeWatcher();
    startUserWatcher();

    return () => {
      stopRecipeWatcher();
      stopUserWatcher();
    };
  }, []);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("auth") === "google_success") {
      // Optional: show toast
      toast.success("Logged in with Google!");

      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);

      // Refresh user data
      loadUser();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* public routes */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Route>

          {/* auth routes */}
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<RecipeBooksPage />} />
            </Route>
          </Route>

          {/* guest routes */}
          <Route element={<RequireGuest />}>
            <Route path="/login" element={<LoginPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
