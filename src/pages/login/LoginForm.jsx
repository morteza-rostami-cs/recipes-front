// components/LoginForm.jsx
import { useState } from "react";
import IdentifierForm from "./IdentifierForm";
import OtpForm from "./OtpForm";
import { Box, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const goToOtp = (emailInput) => {
    setEmail(emailInput);
    setStep(2);
  };

  const goBack = () => {
    setStep(1);
    setEmail("");
  };

  return (
    <MotionBox
      // Card entry: subtle scale + fade
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      maxW="sm"
      mx="auto"
      p={8}
      bg="white"
      rounded="2xl"
      shadow="2xl"
      border="1px"
      borderColor="purple.100"
      _hover={{ shadow: "2xl", borderColor: "purple.200" }}
      // transition="all 0.3s"
      dir="rtl"
      textAlign="right"
    >
      {/* Manual SEO for form steps */}
      {step === 1 ? (
        <>
          <title>ایمیل یا | سرآشپز</title>
          <meta
            name="description"
            content="وارد کردن ایمیل یا  برای ورود یا ثبت‌نام"
          />
        </>
      ) : (
        <>
          <title>تأیید کد | سرآشپز</title>
          <meta name="description" content="کد تأیید ارسال‌شده را وارد کنید" />
        </>
      )}

      {/* Step indicator – subtle UX enhancement */}
      <Text
        fontSize="sm"
        color="purple.600"
        fontWeight="bold"
        textAlign="center"
        mb={4}
      >
        گام {step} از ۲
      </Text>

      <VStack spacing={6} align="stretch">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <MotionBox
              key="identifier"
              // RTL: Enter from **right**, exit to **left**
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <IdentifierForm onNext={goToOtp} />
            </MotionBox>
          ) : (
            <MotionBox
              key="otp"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <OtpForm email={email} onBack={goBack} />
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  );
}
