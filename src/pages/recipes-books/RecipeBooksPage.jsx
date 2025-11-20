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
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CreateRecipeForm from "../recipesBooks/CreateRecipe";
import CardGrid from "./CardGrid";
import Card from "./Card";
import { useModalStore } from "../../stores/modalStore";
import useManageRecipesStore from "../../stores/useManageRecipeStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const MotionButton = motion(Button);

export default function RecipeBooksPage() {
  const { openModal, closeModal } = useModalStore();
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

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

  // Handlers (will be replaced with real actions later)
  const handleDelete = (id) => {
    openModal(
      <ConfirmDeleteModal
        onConfirm={() => {
          remove(id);
          closeModal();
        }}
        onCancel={closeModal}
      />,
      {
        title: "Delete Recipe",
        size: "sm",
        maxW: "2xl",
      }
    );
  };

  const handleEdit = (id) => {
    toast("Edit coming soon", {
      icon: "Pencil",
      style: { borderRadius: "12px" },
    });
  };

  const handleView = (id) => {
    toast(`Viewing #${id}`, {
      icon: "Eye",
      style: { borderRadius: "12px" },
    });
  };

  const openCreateModal = () => {
    openModal(
      <CreateRecipeForm
        onSuccess={() => {
          closeModal();
        }}
      />,
      {
        title: "Create New Recipe Book",
        size: "2xl",
        scrollBehavior: "inside",
      }
    );
  };

  return (
    <Box maxW="7xl" mx="auto" p={{ base: 4, md: 6 }} bg={bg}>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDir={{ base: "column", sm: "row" }}
        gap={4}
      >
        <VStack align="start" spacing={1}>
          <Heading
            size="xl"
            fontWeight="extrabold"
            bgGradient="linear(to-r, purple.600, purple.800)"
            bgClip="text"
          >
            Recipe Books
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Manage and organize your curated collections
          </Text>
        </VStack>

        <MotionButton
          leftIcon={<FiPlus />}
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
        >
          Create Recipe Book
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
          <IconButton
            icon={<FiFilter />}
            variant="outline"
            size="sm"
            rounded="full"
            aria-label="Filter"
            _hover={{ bg: "purple.50" }}
          />
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {recipes.length} books
          </Text>
        </HStack>

        <Select
          w="200px"
          size="md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          bg={cardBg}
          borderColor="gray.300"
          rounded="xl"
          fontWeight="medium"
          _focus={{ ring: 2, ringColor: "purple.400" }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
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
          <Text color="red.500" fontWeight="medium">
            {error}
          </Text>
        </Center>
      )}

      {/* Empty State */}
      {!loading && !error && recipes.length === 0 && (
        <Center py={20}>
          <VStack spacing={4} color="gray.500">
            <Text fontSize="lg" fontWeight="medium">
              No recipe books yet
            </Text>
            <Text fontSize="sm">
              Create your first collection to get started
            </Text>
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
                onEdit={() => handleEdit(recipe.id)}
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
