// src/components/IfAuth.jsx
import useUsersStore from "../stores/usersStore";

export default function IfAuth({ children }) {
  const { user } = useUsersStore();
  return user ? children : null;
}
