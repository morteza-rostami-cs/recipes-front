// pages/HomePage.jsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import Recipes from "./Recipes";

const MotionBox = motion(Box);

export default function HomePage() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      minH="100vh"
      // bgGradient="linear(to-bl, purple.50, purple.100)"
      dir="rtl"
      textAlign="right"
      overflowX="hidden"
    >
      {/* Manual SEO – Home Page */}
      <>
        <title>سرآشپز – آشپزی حرفه‌ای با حس خانه</title>
        <meta
          name="description"
          content="دستور پخت‌های ایرانی و جهانی با مواد در دسترس، گام به گام و با حس خانه. سرآشپز همراه شماست."
        />
        <meta property="og:title" content="سرآشپز – آشپزی حرفه‌ای با حس خانه" />
        <meta
          property="og:description"
          content="دستور پخت‌های ایرانی و جهانی با مواد در دسترس، گام به گام و با حس خانه."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
      </>

      {/* Hero Section */}
      <Hero />

      {/* Recipes Grid */}
      <Recipes />
    </MotionBox>
  );
}
