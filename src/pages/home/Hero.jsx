// components/Hero.jsx
import React from "react";
import { Button, Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImgSrc from "../../assets/hero.jpeg";

const MotionBox = motion(Box);

export default function Hero() {
  return (
    <Box
      bgGradient="linear(to-bl, purple.50, purple.100, purple.200)" // RTL gradient
      py={{ base: 16, md: 24 }}
      overflow="hidden"
      dir="rtl"
      textAlign="right"
    >
      {/* Manual SEO */}
      <>
        <title>سرآشپز – دستور پخت‌های خوشمزه با حس خانه</title>
        <meta
          name="description"
          content="دستور پخت‌های ایرانی و جهانی، گام به گام، با مواد در دسترس. سرآشپز همراه شماست."
        />
        <meta property="og:title" content="سرآشپز – آشپزی حرفه‌ای با حس خانه" />
        <meta
          property="og:description"
          content="دستور پخت‌های ایرانی و جهانی، گام به گام، با مواد در دسترس."
        />
      </>

      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 6, lg: 8 }}
        display="flex"
        flexDir={{ base: "column-reverse", lg: "row" }}
        alignItems="center"
        gap={{ base: 12, lg: 16 }}
      >
        {/* Right Content (RTL: text on right) */}
        <VStack
          flex="1"
          align={{ base: "center", lg: "start" }}
          textAlign={{ base: "center", lg: "right" }}
          spacing={6}
          as={MotionBox}
          initial={{ opacity: 0, x: 300 }} // Enter from right
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            lineHeight="tight"
            letterSpacing="tight"
            bgGradient="linear(to-r, purple.600, purple.800)"
            bgClip="text"
            fontFamily="'Almarai', sans-serif"
          >
            دستور پخت‌های خوشمزه خود را به اشتراک بگذارید
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            maxW="lg"
            lineHeight="relaxed"
            fontFamily="'Vazirmatn', sans-serif"
            className="self-start"
          >
            به جامعه‌ی عاشقان آشپزی بپیوندید. بهترین دستورهای خود را به نمایش
            بگذارید، طعم‌های جدید کشف کنید و عاشقان غذا را الهام ببخشید!
          </Text>

          <Button
            as={Link}
            to="/login"
            bg="purple.500"
            color="white"
            size="lg"
            px={8}
            py={6}
            rounded="full"
            fontWeight="bold"
            boxShadow="xl"
            whileHover={{ scale: 1.03, boxShadow: "2xl" }}
            whileTap={{ scale: 0.98 }}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            شروع آشپزی
          </Button>
        </VStack>

        {/* Left Image (RTL: image on left) */}
        <Box
          flex="1"
          display="flex"
          justifyContent={{ base: "center", lg: "center" }}
          as={MotionBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            maxW={{ base: "sm", lg: "md" }}
            w="full"
            h={{ base: 72, sm: 80, lg: 96 }}
            rounded="3xl"
            overflow="hidden"
            boxShadow="2xl"
            border="8px solid white"
            transform="rotate(3deg)" // RTL: rotate positive
            _hover={{ transform: "rotate(1deg)" }}
            transition="transform 0.3s ease"
          >
            <Image
              src={heroImgSrc}
              alt="دستور پخت خوشمزه"
              w="full"
              h="full"
              objectFit="cover"
              loading="eager"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
