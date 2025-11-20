import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useUsersStore from "../stores/usersStore";

const SiteLayout = () => {
  const { getUser } = useUsersStore();
  const user = getUser();

  return (
    <div>
      {/* Global header */}
      <Header user={user} />

      <div>
        <Outlet />
      </div>

      {/* Optional footer */}
      <Footer />
    </div>
  );
};

export default SiteLayout;
