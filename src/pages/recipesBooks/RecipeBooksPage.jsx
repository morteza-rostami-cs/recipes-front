// pages/RecipeBooksPage.jsx
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  VStack,
  Text,
  Center,
  Spinner,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FiPlus, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CreateRecipeForm from "./CreateRecipeForm";
import CardGrid from "./CardGrid";
import Card from "./Card";
import { useModalStore } from "../../stores/modalStore";
import useManageRecipesStore from "../../stores/useManageRecipeStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const MotionButton = motion(Button);

export default function RecipeBooksPage() {
  const { openModal, closeModal } = useModalStore();

  const {
    recipes,
    loading,
    crudLoading,
    error,
    fetchRecipes,
    setSortOrder,
    sortOrder,
    remove,
  } = useManageRecipesStore();

  // Fetch on mount + sort change
  useEffect(() => {
    fetchRecipes({ page: 1 });
  }, [sortOrder, fetchRecipes]);

  // Handlers
  const handleDelete = (id) => {
    openModal(
      <ConfirmDeleteModal
        onConfirm={() => {
          remove(id);
          closeModal();
          toast.success("دستور با موفقیت حذف شد");
        }}
        onCancel={closeModal}
      />,
      {
        title: "حذف دستور",
        size: "sm",
        maxW: "2xl",
      }
    );
  };

  const handleEdit = (recipe) => {
    openModal(
      <CreateRecipeForm
        initialData={recipe}
        mode="edit"
        onSuccess={() => {
          closeModal();
          toast.success("دستور با موفقیت ویرایش شد");
        }}
      />,
      { title: "ویرایش دستور", size: "2xl", scrollBehavior: "inside" }
    );
  };

  const handleView = (id) => {
    toast(`مشاهده دستور #${id}`, {
      icon: "Eye",
      style: { borderRadius: "12px", fontFamily: "'Vazirmatn', sans-serif" },
    });
  };

  const openCreateModal = () => {
    openModal(
      <CreateRecipeForm
        onSuccess={() => {
          closeModal();
          toast.success("دستور جدید با موفقیت ایجاد شد");
        }}
      />,
      {
        title: "ایجاد دستور جدید",
        size: "2xl",
        scrollBehavior: "inside",
      }
    );
  };

  return (
    <Box
      maxW="7xl"
      mx="auto"
      p={{ base: 4, md: 6 }}
      bg="gray.50"
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDir={{ base: "column", sm: "row" }}
        gap={4}
      >
        <VStack align="end" spacing={1}>
          <Heading
            size="xl"
            fontWeight="extrabold"
            bgGradient="linear(to-l, purple.600, purple.800)"
            bgClip="text"
            fontFamily="'Almarai', sans-serif"
          >
            کتاب دستورها
          </Heading>
          <Text fontSize="sm" color="gray.600">
            مدیریت و سازماندهی مجموعه‌های دست‌چین شما
          </Text>
        </VStack>

        <MotionButton
          rightIcon={<FiPlus />}
          colorScheme="purple"
          size="lg"
          px={6}
          py={6}
          rounded="full"
          fontWeight="bold"
          boxShadow="lg"
          onClick={openCreateModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          fontFamily="'Almarai', sans-serif"
        >
          ایجاد دستور
        </MotionButton>
      </Flex>

      {/* Sort & Filter */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexWrap="wrap"
        gap={4}
      >
        <HStack>
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {recipes.length} کتاب
          </Text>
          <IconButton
            icon={<FiFilter />}
            variant="outline"
            size="sm"
            rounded="full"
            aria-label="فیلتر"
            _hover={{ bg: "purple.50" }}
          />
        </HStack>

        <Select
          w="200px"
          size="md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          bg="white"
          borderColor="purple.100"
          rounded="xl"
          fontWeight="medium"
          _focus={{ ring: 2, ringColor: "purple.400" }}
          fontFamily="'Almarai', sans-serif"
        >
          <option value="newest">جدیدترین</option>
          <option value="oldest">قدیمی‌ترین</option>
        </Select>
      </Flex>

      {/* Loading State */}
      {loading && recipes.length === 0 && (
        <Center py={20}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
        </Center>
      )}

      {/* Error State */}
      {error && !loading && (
        <Center py={20}>
          <Text
            color="red.500"
            fontWeight="medium"
            fontFamily="'Vazirmatn', sans-serif"
          >
            {error}
          </Text>
        </Center>
      )}

      {/* Empty State */}
      {!loading && !error && recipes.length === 0 && (
        <Center py={20}>
          <VStack spacing={4} color="gray.500">
            <Text
              fontSize="lg"
              fontWeight="medium"
              fontFamily="'Almarai', sans-serif"
            >
              هنوز کتاب دستوری وجود ندارد
            </Text>
            <Text fontSize="sm">اولین مجموعه خود را بسازید تا شروع کنید</Text>
          </VStack>
        </Center>
      )}

      {/* Recipe Grid */}
      {!loading && !error && recipes.length > 0 && (
        <CardGrid>
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                loading={crudLoading}
                recipe={recipe}
                onEdit={() => handleEdit(recipe)}
                onDelete={() => handleDelete(recipe.id)}
                onView={() => handleView(recipe.id)}
              />
            </motion.div>
          ))}
        </CardGrid>
      )}
    </Box>
  );
}
