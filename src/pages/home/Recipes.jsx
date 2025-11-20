// components/Recipes.jsx
import React, { useEffect, useRef } from "react";
import { Box, Heading, VStack, Text, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Scroller } from "./Scroller";
import CardGrid from "../../components/CardGrid";
import Container from "../../components/Container";
import useRecipesStore from "../../stores/recipesStore";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);

export default function Recipes() {
  const [currentCategory, setCurrentCategory] = React.useState("");
  const isFirstLoad = useRef(true);

  const {
    publicRecipes,
    publicLoading,
    publicPagination,
    getPublicRecipes,
    loadMorePublicRecipes,
    getCategories,
    categories,
    categoriesLoading,
  } = useRecipesStore();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
    triggerOnce: false,
  });

  // Initial load + category change
  useEffect(() => {
    console.log(currentCategory);
    getPublicRecipes({
      per_page: 12,
      page: 1,
      category: currentCategory || undefined,
    });
    isFirstLoad.current = true;
  }, [currentCategory, getPublicRecipes]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Load more
  useEffect(() => {
    if (
      !isFirstLoad.current &&
      inView &&
      !publicLoading &&
      publicPagination.currentPage < publicPagination.totalPages
    ) {
      loadMorePublicRecipes(currentCategory);
    }
    if (isFirstLoad.current) isFirstLoad.current = false;
  }, [inView, publicPagination.currentPage, currentCategory]);

  return (
    <Container>
      <VStack spacing={8} align="stretch" py={6} dir="rtl" textAlign="right">
        {/* Manual SEO */}
        <>
          <title>دستور پخت‌های ما | سرآشپز</title>
          <meta
            name="description"
            content="دستور پخت‌های خوشمزه ایرانی و جهانی، با مواد در دسترس و گام به گام."
          />
        </>

        {/* Title */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            fontWeight="extrabold"
            color="gray.800"
            bgGradient="linear(to-r, purple.600, purple.800)"
            bgClip="text"
            fontFamily="'Almarai', sans-serif"
          >
            دستور پخت‌های ما
          </Heading>
        </MotionBox>

        {/* Scroller */}
        <Scroller
          currentCategory={currentCategory}
          categories={categories}
          onSelect={setCurrentCategory}
          isLoading={categoriesLoading}
        />

        {/* Grid */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CardGrid cards={publicRecipes} isLoading={publicLoading} />

          {/* Infinite Scroll Trigger */}
          {publicPagination.currentPage < publicPagination.totalPages && (
            <Box
              ref={ref}
              minH="20"
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              {publicLoading ? (
                <Spinner size="lg" color="purple.500" thickness="3px" />
              ) : (
                <Text color="gray.500" fontSize="sm" fontWeight="medium">
                  اسکرول کنید تا بیشتر ببینید
                </Text>
              )}
            </Box>
          )}
        </MotionBox>
      </VStack>
    </Container>
  );
}
