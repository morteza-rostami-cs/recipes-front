// components/IdentifierForm.jsx
import {
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  IconButton,
  Heading,
  Box,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useUsersStore from "../../stores/usersStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config/config";

const MotionButton = motion(Button);
const MotionInput = motion(Input);
const MotionInputGroup = motion(InputGroup);

export default function IdentifierForm({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getOtp, isLoading } = useUsersStore();

  const onSubmit = async (data) => {
    const email = data.email.trim();

    const loadingToast = toast.loading(`در حال ارسال کد به ${email}...`, {
      style: { borderRadius: "12px", direction: "rtl" },
    });

    try {
      await getOtp({ email });
      toast.dismiss(loadingToast);
      toast.success(`کد به ${email} ارسال شد!`, {
        duration: 4000,
        style: { borderRadius: "12px", direction: "rtl" },
      });
      onNext(email, "email");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(
        err?.response?.data?.message ||
          "ارسال کد ناموفق بود. دوباره تلاش کنید.",
        {
          duration: 5000,
          style: { borderRadius: "12px", direction: "rtl" },
        }
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API_BASE_URL + "/recipe-auth/v1/google/start";
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
        <title>ایمیل یا | سرآشپز</title>
        <meta
          name="description"
          content="وارد کردن ایمیل یا  برای ورود یا ثبت‌نام"
        />
      </>

      {/* Header */}
      <Flex justify="space-between" align="center">
        <IconButton
          as={Link}
          to="/"
          icon={<FiArrowRight />}
          size="sm"
          variant="ghost"
          color="gray.500"
          _hover={{ color: "purple.600", bg: "purple.50" }}
          rounded="full"
          transition="all 0.2s"
          aria-label="بازگشت به خانه"
        />
        <Heading
          size="lg"
          fontWeight="extrabold"
          bgGradient="linear(to-r, purple.600, purple.800)"
          bgClip="text"
          letterSpacing="tight"
          fontFamily="'Almarai', sans-serif"
        >
          سرآشپز
        </Heading>
      </Flex>

      {/* Title */}
      <VStack spacing={1} textAlign="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          خوش آمدید!
        </Text>
        <Text fontSize="sm" color="gray.600">
          ایمیل خود را وارد کنید
        </Text>
      </VStack>

      {/* Email Input */}
      <Box position="relative">
        <MotionInputGroup
          size="lg"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Icon now on the RIGHT (RTL) */}
          <InputLeftElement
            pointerEvents="none"
            color="purple.500"
            left="auto"
            right={4}
          >
            <FiMail />
          </InputLeftElement>

          <MotionInput
            type="email"
            placeholder="you@example.com"
            rounded="xl"
            border="2px"
            borderColor={errors.email ? "red.400" : "gray.200"}
            bg="white"
            textAlign="right"
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 3px rgba(147,51,234,0.2)",
            }}
            _placeholder={{ color: "gray.400", textAlign: "right" }}
            fontSize="md"
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "لطفاً ایمیل معتبر وارد کنید",
              },
            })}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </MotionInputGroup>

        {/* Error */}
        {errors.email && (
          <Text color="red.500" fontSize="sm" mt={2} fontWeight="medium">
            {errors.email.message}
          </Text>
        )}
      </Box>

      {/* Continue Button */}
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
        loadingText="در حال ارسال..."
      >
        ادامه
      </MotionButton>

      {/* Divider */}
      <HStack>
        <Divider />
        <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
          یا
        </Text>
        <Divider />
      </HStack>

      {/* Google Login */}
      <MotionButton
        variant="outline"
        leftIcon={<Icon as={FcGoogle} w={5} h={5} />}
        border="2px"
        borderColor="gray.300"
        color="gray.700"
        fontWeight="medium"
        w="full"
        py={6}
        rounded="full"
        onClick={handleGoogleLogin}
        _hover={{ borderColor: "purple.400", color: "purple.600" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition="all 0.2s"
      >
        ادامه با گوگل
      </MotionButton>

      {/* Terms */}
      <Text fontSize="xs" color="gray.500" textAlign="center" lineHeight="1.4">
        با ادامه، با{" "}
        <Text as="span" color="purple.600" fontWeight="medium" cursor="pointer">
          شرایط استفاده
        </Text>{" "}
        و{" "}
        <Text as="span" color="purple.600" fontWeight="medium" cursor="pointer">
          حریم خصوصی
        </Text>{" "}
        ما موافقت می‌کنید.
      </Text>
    </VStack>
  );
}
