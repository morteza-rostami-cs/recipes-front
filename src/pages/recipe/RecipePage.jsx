// pages/RecipeDetailsPage.jsx
import React, { useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
  Tag,
  TagLabel,
  Button,
  Icon,
  Container,
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Skeleton,
  SkeletonText,
  Center,
  Spinner,
} from "@chakra-ui/react";
import {
  FiClock,
  FiUsers,
  FiTag,
  FiArrowLeft,
  FiPrinter,
  FiBookOpen,
} from "react-icons/fi";
import { FaFireFlameSimple } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";
import useRecipesStore from "../../stores/recipesStore";
import { formatFriendlyDate } from "../../utils/formatDate";

// Safe fallback for missing data
const defaultNutrition = { protein: "—", carbs: "—", fat: "—", fiber: "—" };

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const { getRecipeById, currentRecipe, recipeLoading } = useRecipesStore();

  useEffect(() => {
    if (id) getRecipeById(id);
  }, [id, getRecipeById]);

  if (recipeLoading) {
    return <RecipeSkeleton />;
  }

  if (!currentRecipe) {
    return (
      <Center minH="100vh" dir="rtl">
        <Text
          fontSize="xl"
          color="gray.500"
          fontFamily="'Vazirmatn', sans-serif"
        >
          دستور پخت یافت نشد.
        </Text>
      </Center>
    );
  }
  console.log(currentRecipe);
  // Safe access to nested fields
  let nutrition = {
    carbs: currentRecipe?.carbs,
    fat: currentRecipe?.fat,
    fiber: currentRecipe?.fiber,
    protein: currentRecipe?.protein,
  };
  nutrition = nutrition ?? defaultNutrition;

  const tags = Array.isArray(currentRecipe.tags) ? currentRecipe.tags : [];
  const ingredients = Array.isArray(currentRecipe.ingredients)
    ? currentRecipe.ingredients
    : [];
  const instructions = Array.isArray(currentRecipe.instructions)
    ? currentRecipe.instructions
    : [];

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      dir="rtl"
      textAlign="right"
      fontFamily="'Vazirmatn', sans-serif"
    >
      {/* Manual SEO */}
      <>
        <title>{currentRecipe.title} | سرآشپز</title>
        <meta
          name="description"
          content={currentRecipe.excerpt || currentRecipe.description || ""}
        />
        <meta property="og:title" content={currentRecipe.title} />
        <meta
          property="og:description"
          content={currentRecipe.excerpt || currentRecipe.description || ""}
        />
        <meta property="og:image" content={currentRecipe.featured_image} />
      </>

      <Container maxW="4xl" py={{ base: 6, md: 10 }}>
        {/* Breadcrumb */}
        <Breadcrumb mb={6} fontSize="sm" color="gray.600" spacing={2}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/" _hover={{ color: "purple.600" }}>
              خانه
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              // as={Link}
              // to="/recipes"
              _hover={{ color: "purple.600" }}
            >
              دستورها
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text noOfLines={1} fontWeight="medium">
              {currentRecipe.title}
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Hero Section */}
        <Box
          position="relative"
          rounded="2xl"
          overflow="hidden"
          mb={10}
          shadow="2xl"
        >
          <Image
            src={currentRecipe.featured_image}
            alt={currentRecipe.title}
            w="full"
            h={{ base: "320px", md: "520px" }}
            objectFit="cover"
            loading="eager"
            fallbackSrc="/placeholder-recipe.jpg"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.700, transparent 40%)"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={6}
            color="white"
          >
            <Heading
              size={{ base: "xl", md: "2xl" }}
              mb={3}
              lineHeight="tight"
              fontFamily="'Almarai', sans-serif"
            >
              {currentRecipe.title}
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="2xl" opacity={0.95}>
              {currentRecipe.excerpt ||
                currentRecipe.description ||
                "بدون توضیح"}
            </Text>
          </Box>
        </Box>

        {/* Metadata */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
          <MetadataItem
            icon={FiClock}
            label="زمان کل"
            value={
              currentRecipe.total_time
                ? `${currentRecipe.total_time} دقیقه`
                : "—"
            }
            color="purple.600"
          />
          <MetadataItem
            icon={FaFireFlameSimple}
            label="کالری"
            value={
              currentRecipe.calories ? `${currentRecipe.calories} کالری` : "—"
            }
            color="orange.500"
          />
          <MetadataItem
            icon={FiUsers}
            label="تعداد نفرات"
            value={currentRecipe.servings || "—"}
            color="blue.500"
          />
          <MetadataItem
            icon={FiTag}
            label="سطح دشواری"
            value={
              currentRecipe.difficulty === "easy"
                ? "آسان"
                : currentRecipe.difficulty === "medium"
                ? "متوسط"
                : currentRecipe.difficulty === "hard"
                ? "سخت"
                : "—"
            }
            color="green.500"
          />
        </SimpleGrid>

        {/* Tags */}
        {tags.length > 0 && (
          <HStack mb={10} flexWrap="wrap" gap={2} justify="flex-end">
            {tags.map((tag) => (
              <Tag
                key={tag.id || tag}
                size="md"
                variant="outline"
                colorScheme="purple"
                border="2px"
                borderColor="purple.300"
                bg="white"
                color="purple.700"
                fontWeight="semibold"
                rounded="full"
                px={3}
                py={1.5}
                _hover={{ bg: "purple.50", borderColor: "purple.400" }}
                transition="all 0.2s"
                fontFamily="'Almarai', sans-serif"
              >
                <TagLabel>
                  {typeof tag === "string" ? tag : tag.name || "—"}
                </TagLabel>
              </Tag>
            ))}
          </HStack>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={12}>
          {/* Ingredients */}
          <Box
            bg="white"
            p={8}
            rounded="2xl"
            shadow="lg"
            border="1px"
            borderColor="purple.100"
          >
            <Heading
              size="lg"
              mb={5}
              color="purple.700"
              fontFamily="'Almarai', sans-serif"
            >
              مواد لازم
            </Heading>
            {ingredients.length > 0 ? (
              <List spacing={4}>
                {ingredients.map((ing, i) => (
                  <ListItem
                    key={i}
                    fontSize="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Text>{typeof ing === "string" ? ing : "—"}</Text>
                    <ListIcon as={FiBookOpen} color="purple.500" />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text color="gray.500">مواد لازم در دسترس نیست.</Text>
            )}
          </Box>

          {/* Instructions */}
          <Box
            bg="white"
            p={8}
            rounded="2xl"
            shadow="lg"
            border="1px"
            borderColor="purple.100"
          >
            <Heading
              size="lg"
              mb={5}
              color="purple.700"
              fontFamily="'Almarai', sans-serif"
            >
              مراحل پخت
            </Heading>
            {instructions.length > 0 ? (
              <OrderedList
                spacing={4}
                pl={6}
                styleType="decimal"
                stylePosition="inside"
              >
                {instructions.map((step, i) => (
                  <ListItem key={i} fontSize="md" lineHeight="tall">
                    {typeof step === "string" ? step : "—"}
                  </ListItem>
                ))}
              </OrderedList>
            ) : (
              <Text color="gray.500">مراحل پخت در دسترس نیست.</Text>
            )}
          </Box>
        </SimpleGrid>

        {/* Nutrition */}
        <Box
          bg="white"
          p={8}
          rounded="2xl"
          shadow="lg"
          mb={12}
          border="1px"
          borderColor="purple.100"
        >
          <Heading
            size="lg"
            mb={6}
            color="purple.700"
            fontFamily="'Almarai', sans-serif"
          >
            ارزش غذایی در هر وعده
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Nutrient
              label="پروتئین"
              value={nutrition.protein}
              color="purple.600"
            />
            <Nutrient
              label="کربوهیدرات"
              value={nutrition.carbs}
              color="orange.500"
            />
            <Nutrient label="چربی" value={nutrition.fat} color="yellow.600" />
            <Nutrient label="فیبر" value={nutrition.fiber} color="green.500" />
          </SimpleGrid>
        </Box>

        {/* Author & Actions */}
        <Flex
          justify="space-between"
          align="center"
          mb={10}
          flexWrap="wrap"
          gap={4}
          dir="rtl"
        >
          <Text fontSize="sm" color="gray.600">
            توسط <strong>{currentRecipe.author?.name || "آشپز ناشناس"}</strong>{" "}
            •{" "}
            {formatFriendlyDate(
              currentRecipe.published_at || currentRecipe.date
            )}
          </Text>
          <HStack>
            <Button
              leftIcon={<FiPrinter />}
              variant="outline"
              size="sm"
              rounded="full"
              fontFamily="'Almarai', sans-serif"
            >
              چاپ
            </Button>
            <Button
              as={Link}
              to="/"
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              size="sm"
              rounded="full"
              fontFamily="'Almarai', sans-serif"
            >
              بازگشت
            </Button>
          </HStack>
        </Flex>

        {/* CTA */}
        <Center>
          <Button
            bg="purple.500"
            color="white"
            size="lg"
            px={10}
            py={7}
            rounded="full"
            fontWeight="bold"
            boxShadow="xl"
            _hover={{ transform: "translateY(-2px)", boxShadow: "2xl" }}
            opacity={0.6}
            cursor="not-allowed"
            pointerEvents="none"
            fontFamily="'Almarai', sans-serif"
          >
            شروع آشپزی (به‌زودی)
          </Button>
        </Center>
      </Container>
    </Box>
  );
}

// Reusable Components
const MetadataItem = ({ icon, label, value, color }) => (
  <HStack align="center" className="justify-center" gap={3}>
    <Box textAlign="right">
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontWeight="bold" fontSize="lg" color={color}>
        {value}
      </Text>
    </Box>
    <Icon as={icon} boxSize={6} color={color} />
  </HStack>
);

const Nutrient = ({ label, value, color }) => (
  <Box textAlign="center">
    <Text fontSize="3xl" fontWeight="extrabold" color={color}>
      {value}
    </Text>
    <Text fontSize="sm" color="gray.500" fontFamily="'Almarai', sans-serif">
      {label}
    </Text>
  </Box>
);

// Skeleton
const RecipeSkeleton = () => (
  <Box bg="gray.50" minH="100vh" py={10} dir="rtl">
    <Container maxW="4xl">
      <Skeleton height="40px" width="300px" mb={6} rounded="lg" />
      <Skeleton height="500px" rounded="2xl" mb={10} />
      <SimpleGrid columns={4} spacing={6} mb={8}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height="80px" rounded="xl" />
        ))}
      </SimpleGrid>
      <SkeletonText noOfLines={3} spacing={3} mb={10} />
      <SimpleGrid columns={2} spacing={10}>
        <Skeleton height="300px" rounded="2xl" />
        <Skeleton height="300px" rounded="2xl" />
      </SimpleGrid>
    </Container>
  </Box>
);
