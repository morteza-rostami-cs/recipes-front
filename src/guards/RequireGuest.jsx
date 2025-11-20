// src/components/RequireGuest.jsx
import { Navigate, Outlet } from "react-router-dom";
import useUsersStore from "../stores/usersStore";

export default function RequireGuest() {
  const { user } = useUsersStore();

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
