// src/components/IfGuest.jsx

import useUsersStore from "../stores/usersStore";

export default function IfGuest({ children }) {
  const { user } = useUsersStore();
  return !user ? children : null;
}
