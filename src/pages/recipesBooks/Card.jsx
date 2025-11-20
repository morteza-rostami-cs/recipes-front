// components/Card.jsx
import {
  Box,
  Image,
  Text,
  Badge,
  HStack,
  IconButton,
  VStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiLock,
  FiGlobe,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useModalStore } from "../../stores/modalStore";
import RecipeDetailsModal from "./RecipeDetails";

const MotionBox = motion(Box);

export default function Card({ recipe, onDelete, loading, onEdit }) {
  const { openModal, closeModal } = useModalStore();

  const handleView = () => {
    openModal(<RecipeDetailsModal onClose={closeModal} recipe={recipe} />, {
      title: recipe.title,
      size: "6xl",
    });
  };

  const handleEdit = () => {
    onEdit?.(recipe);
  };

  const handleDelete = async () => {
    try {
      onDelete?.();
    } catch (err) {
      console.error(err?.message || err?.status);
      toast.error("حذف دستور با خطا مواجه شد", {
        style: { borderRadius: "12px", fontFamily: "'Vazirmatn', sans-serif" },
      });
    }
  };

  // Safe data access
  const visibilityIcon = recipe.visibility === "private" ? FiLock : FiGlobe;
  const difficultyLabel =
    recipe.difficulty === "easy"
      ? "آسان"
      : recipe.difficulty === "medium"
      ? "متوسط"
      : recipe.difficulty === "hard"
      ? "سخت"
      : "نامشخص";

  return (
    <MotionBox
      bg="white"
      rounded="2xl"
      overflow="hidden"
      shadow="lg"
      _hover={{ shadow: "2xl", transform: "translateY(-4px)" }}
      transition="all 0.3s ease"
      cursor="pointer"
      position="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      h="full"
      display="flex"
      flexDir="column"
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
    >
      {/* Image */}
      <Box position="relative" h="200px" overflow="hidden">
        <Image
          src={recipe.featured_image || "/placeholder-recipe.jpg"}
          alt={recipe.title}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.4s ease"
          loading="lazy"
        />
        {/* Visibility Badge */}
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme={recipe.visibility === "private" ? "gray" : "green"}
          variant="solid"
          rounded="full"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          fontFamily="'Almarai', sans-serif"
        >
          <Icon as={visibilityIcon} ml={1} boxSize={3} />
          {recipe.visibility === "private" ? "خصوصی" : "عمومی"}
        </Badge>
      </Box>

      {/* Content */}
      <VStack
        p={6}
        spacing={3}
        align="stretch"
        flex="1"
        justify="space-between"
      >
        {/* Title */}
        <Text
          fontSize="lg"
          fontWeight="extrabold"
          color="gray.800"
          lineHeight="shorter"
          noOfLines={2}
          fontFamily="'Almarai', sans-serif"
        >
          {recipe.title}
        </Text>

        {/* Metadata */}
        <HStack
          spacing={4}
          color="gray.600"
          fontSize="sm"
          justify="space-between"
        >
          <HStack>
            <Text>{recipe.total_time || "—"} دقیقه</Text>
            <FiClock boxSize={4} />
          </HStack>
          <HStack>
            <Text>{recipe.calories || "—"} کالری</Text>
            <FaFire boxSize={4} />
          </HStack>
          <HStack>
            <Text>{recipe.servings || "—"}</Text>
            <FiUsers boxSize={4} />
          </HStack>
        </HStack>

        {/* Difficulty Badge */}
        <Badge
          colorScheme={
            recipe.difficulty === "easy"
              ? "green"
              : recipe.difficulty === "medium"
              ? "yellow"
              : recipe.difficulty === "hard"
              ? "orange"
              : "gray"
          }
          variant="solid"
          rounded="full"
          px={3}
          py={1}
          fontWeight="semibold"
          alignSelf="flex-end"
          fontFamily="'Almarai', sans-serif"
        >
          {difficultyLabel}
        </Badge>

        {/* Action Buttons */}
        <HStack
          justify="start"
          spacing={2}
          mt={4}
          pt={3}
          borderTop="1px"
          borderColor="purple.100"
        >
          <IconButton
            icon={<FiEye />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            aria-label="مشاهده"
            onClick={handleView}
            _hover={{ bg: "purple.50", transform: "scale(1.1)" }}
            transition="all 0.2s"
            rounded="full"
            boxShadow="sm"
          />
          <IconButton
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            aria-label="ویرایش"
            onClick={handleEdit}
            _hover={{ bg: "purple.50", transform: "scale(1.1)" }}
            transition="all 0.2s"
            rounded="full"
            boxShadow="sm"
          />
          <IconButton
            isLoading={loading}
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            aria-label="حذف"
            onClick={handleDelete}
            _hover={{ bg: "red.50", transform: "scale(1.1)" }}
            transition="all 0.2s"
            rounded="full"
            boxShadow="sm"
          />
        </HStack>
      </VStack>
    </MotionBox>
  );
}
