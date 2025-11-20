// components/OtpForm.jsx
import {
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUsersStore from "../../stores/usersStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionButton = motion(Button);
const MotionInput = motion(Input);

export default function OtpForm({ email, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading } = useUsersStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = { otp: data.otp, email };

    const loadingToast = toast.loading("در حال تأیید کد...", {
      style: { borderRadius: "12px", direction: "rtl" },
    });

    try {
      await login(payload);
      toast.dismiss(loadingToast);
      toast.success("خوش آمدید!", {
        duration: 4000,
        style: { borderRadius: "12px", direction: "rtl" },
      });
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(
        err?.response?.data?.message || "کد نامعتبر است. دوباره تلاش کنید.",
        {
          duration: 5000,
          style: { borderRadius: "12px", direction: "rtl" },
        }
      );
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={6}
      align="stretch"
      dir="rtl"
      textAlign="right"
    >
      {/* Manual SEO */}
      <>
        <title>تأیید کد | سرآشپز</title>
        <meta
          name="description"
          content="کد تأیید ارسال‌شده به ایمیل خود را وارد کنید"
        />
      </>

      {/* Header: Back + Email */}
      <HStack w="full" justify="space-between" align="center">
        <Text
          fontSize="sm"
          color="gray.600"
          textAlign="center"
          flex="1"
          dir="ltr"
          fontFamily="monospace"
        >
          کد به <strong>{email}</strong> ارسال شد
        </Text>
        <Icon
          as={FiArrowLeft}
          w={6}
          h={6}
          color="purple.500"
          cursor="pointer"
          onClick={onBack}
          _hover={{ transform: "translateX(2px)" }} // RTL: move right on hover
          transition="all 0.2s"
          aria-label="بازگشت"
        />
      </HStack>

      {/* Title */}
      <VStack spacing={1} textAlign="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          کد تأیید را وارد کنید
        </Text>
        <Text fontSize="sm" color="gray.600">
          ایمیل خود را چک کنید
        </Text>
      </VStack>

      {/* OTP Input */}
      <Box position="relative">
        <InputGroup size="lg">
          {/* Icon on the RIGHT in RTL */}
          <InputLeftElement
            pointerEvents="none"
            color="purple.500"
            left="auto"
            right={4}
          >
            <FiLock />
          </InputLeftElement>

          <MotionInput
            type="text"
            inputMode="numeric"
            placeholder="۰۰۰۰۰۰"
            maxLength={6}
            rounded="xl"
            border="2px"
            borderColor={errors.otp ? "red.400" : "gray.200"}
            bg="white"
            fontSize="xl"
            fontWeight="bold"
            letterSpacing="0.5em"
            textAlign="center"
            _placeholder={{
              color: "gray.300",
              letterSpacing: "normal",
              fontFamily: "Vazirmatn, sans-serif",
            }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 3px rgba(147,51,234,0.2)",
            }}
            {...register("otp", {
              required: "کد الزامی است",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "کد باید ۶ رقم باشد",
              },
            })}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </InputGroup>

        {errors.otp && (
          <Text
            color="red.500"
            fontSize="sm"
            mt={2}
            fontWeight="medium"
            textAlign="center"
          >
            {errors.otp.message}
          </Text>
        )}
      </Box>

      {/* Submit Button */}
      <MotionButton
        type="submit"
        isLoading={isLoading}
        bg="purple.500"
        color="white"
        size="lg"
        w="full"
        py={7}
        rounded="full"
        fontWeight="bold"
        fontSize="md"
        boxShadow="xl"
        whileHover={{ scale: 1.03, boxShadow: "2xl" }}
        whileTap={{ scale: 0.98 }}
        _hover={{ transform: "translateY(-2px)" }}
        loadingText="در حال تأیید..."
      >
        تأیید و ورود
      </MotionButton>

      {/* Resend Link */}
      <Text fontSize="sm" color="gray.600" textAlign="center">
        کد را دریافت نکردید؟{" "}
        <Text
          as="span"
          color="purple.600"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          ارسال مجدد کد
        </Text>
      </Text>
    </VStack>
  );
}
