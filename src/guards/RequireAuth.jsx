// src/components/RequireAuth.jsx
import { Navigate, Outlet } from "react-router-dom";
import useUsersStore from "../stores/usersStore";
import { Spinner, Center } from "@chakra-ui/react";

export default function RequireAuth() {
  const { user, isLoading } = useUsersStore();

  if (isLoading)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
