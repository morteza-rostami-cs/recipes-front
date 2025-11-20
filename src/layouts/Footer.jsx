// components/Footer.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import PLogo from "../components/PLogo";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Box
      as="footer"
      bg="gray.50"
      borderTop="1px"
      borderColor="purple.100"
      mt={path === "/" ? 16 : 0}
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
      textAlign="right"
    >
      {/* Manual SEO */}
      <>
        <title>تماس با ما | سرآشپز</title>
        <meta
          name="description"
          content="با سرآشپز در ارتباط باشید. دستور پخت‌های خوشمزه، همیشه همراه شما."
        />
      </>

      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 8 }} py={12}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "start" }}
          gap={{ base: 8, md: 12 }}
          textAlign={{ base: "center", md: "right" }}
        >
          {/* Logo & Tagline */}
          <VStack
            align={{ base: "center", md: "start" }}
            spacing={3}
            flex={1}
            className="text-center md:text-right"
          >
            <PLogo />
            <Text fontSize="sm" color="gray.600" maxW="xs">
              عشق به آشپزی را به اشتراک بگذارید. کشف کنید، خلق کنید و با هر
              دستور، الهام ببخشید.
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align={{ base: "center", md: "start" }} spacing={2}>
            <Text
              fontWeight="extrabold"
              color="gray.800"
              fontSize="lg"
              fontFamily="'Almarai', sans-serif"
            >
              لینک‌های سریع
            </Text>
            <Link
              // href="/recipes"
              color="purple.600"
              _hover={{ color: "purple.700", textDecoration: "underline" }}
            >
              همه دستورها
            </Link>
            <Link
              // href="/categories"
              color="purple.600"
              _hover={{ color: "purple.700", textDecoration: "underline" }}
            >
              دسته‌بندی‌ها
            </Link>
            <Link
              // href="/submit"
              color="purple.600"
              _hover={{ color: "purple.700", textDecoration: "underline" }}
            >
              ارسال دستور
            </Link>
            <Link
              // href="/about"
              color="purple.600"
              _hover={{ color: "purple.700", textDecoration: "underline" }}
            >
              درباره ما
            </Link>
          </VStack>

          {/* Contact Info */}
          <VStack align={{ base: "center", md: "start" }} spacing={3}>
            <Text
              fontWeight="extrabold"
              color="gray.800"
              fontSize="lg"
              fontFamily="'Almarai', sans-serif"
            >
              تماس با ما
            </Text>
            <HStack spacing={2} color="gray.600" justify="flex-start" w="full">
              <FiMail />
              <Text fontSize="sm">hello@sarashpaz.app</Text>
            </HStack>
            <HStack spacing={2} color="gray.600" justify="flex-start" w="full">
              <FiPhone />
              <Text fontSize="sm">+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹</Text>
            </HStack>
            <HStack spacing={2} color="gray.600" justify="flex-start" w="full">
              <FiMapPin />
              <Text fontSize="sm">تهران، ایران</Text>
            </HStack>
          </VStack>

          {/* Social Media */}
          <VStack align={{ base: "center", md: "start" }} spacing={3}>
            <Text
              fontWeight="extrabold"
              color="gray.800"
              fontSize="lg"
              fontFamily="'Almarai', sans-serif"
            >
              ما را دنبال کنید
            </Text>
            <HStack spacing={3} justify="flex-start">
              <IconButton
                aria-label="اینستاگرام"
                icon={<FiInstagram />}
                size="md"
                rounded="full"
                bg="purple.50"
                color="purple.600"
                _hover={{ bg: "purple.100", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <IconButton
                aria-label="توییتر"
                icon={<FiTwitter />}
                size="md"
                rounded="full"
                bg="purple.50"
                color="purple.600"
                _hover={{ bg: "purple.100", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <IconButton
                aria-label="فیسبوک"
                icon={<FiFacebook />}
                size="md"
                rounded="full"
                bg="purple.50"
                color="purple.600"
                _hover={{ bg: "purple.100", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </HStack>
          </VStack>
        </Flex>

        <Divider my={8} borderColor="purple.100" />

        {/* Bottom Bar */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          fontSize="sm"
          color="gray.500"
          gap={2}
          textAlign={{ base: "center", sm: "right" }}
        >
          <Text>
            © {year} <strong>سرآشپز</strong>. تمامی حقوق محفوظ است.
          </Text>
          <HStack spacing={4} justify={{ base: "center", sm: "flex-end" }}>
            <Link href="/" _hover={{ color: "purple.600" }}>
              حریم خصوصی
            </Link>
            <Link href="/" _hover={{ color: "purple.600" }}>
              شرایط استفاده
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
