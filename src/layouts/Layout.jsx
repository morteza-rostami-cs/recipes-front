import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { GlobalModal } from "../components/GlobalModal";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global modal */}
      <GlobalModal />

      {/* Global toast` */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 6000,
          style: {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
};

export default Layout;
