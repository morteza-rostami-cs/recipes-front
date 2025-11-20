// pages/LoginPage.jsx
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";

const MotionBox = motion(Box);

export default function LoginPage() {
  return (
    <MotionBox
      // Page fade-in (RTL-aware: no x-shift needed)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      minH="100vh"
      bgGradient="linear(to-bl, purple.50, purple.100)" // ← RTL: to-bl instead of to-br
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, md: 6 }}
      textAlign="right"
      dir="rtl"
    >
      {/* Manual SEO: Page-specific title & description */}
      <>
        <title>ورود یا ثبت‌نام | سرآشپز</title>
        <meta
          name="description"
          content="با ایمیل  وارد شوید و آشپزی حرفه‌ای با حس خانه را شروع کنید."
        />
        <meta property="og:title" content="ورود یا ثبت‌نام | سرآشپز" />
        <meta
          property="og:description"
          content="با ایمیل  وارد شوید و آشپزی حرفه‌ای با حس خانه را شروع کنید."
        />
      </>

      {/* Card container with RTL entry from right */}
      <MotionBox
        initial={{ x: 300, opacity: 0 }} // Enter from right
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          delay: 0.15,
        }}
        w="full"
        maxW="md"
        mx="auto"
      >
        {/* Optional subtle header above form (UX enhancement – not forced) */}
        {/* <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="extrabold"
          textAlign="center"
          bgGradient="linear(to-r, purple.600, purple.800)"
          bgClip="text"
          mb={6}
          opacity={0.9}
        >
          به سرآشپز خوش آمدید
        </Text> */}

        <LoginForm />
      </MotionBox>
    </MotionBox>
  );
}
