// components/RecipeDetailsModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
} from "@chakra-ui/react";
import { FiClock, FiUsers, FiLock, FiGlobe, FiTag } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);
const MotionBox = motion(Box);

export default function RecipeDetailsModal({ recipe, onClose }) {
  if (!recipe) return null;

  const visibilityIcon = recipe.visibility === "private" ? FiLock : FiGlobe;
  const difficultyColor =
    {
      آسان: "green",
      متوسط: "yellow",
      سخت: "orange",
    }[recipe.difficulty] || "purple";

  const difficultyLabel =
    {
      easy: "آسان",
      medium: "متوسط",
      hard: "سخت",
    }[recipe.difficulty?.toLowerCase()] || "متوسط";

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="6xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(12px)" bg="blackAlpha.600" />
      <MotionModalContent
        bg="white"
        rounded="3xl"
        overflow="hidden"
        shadow="2xl"
        maxW="6xl"
        mx={{ base: 4, md: 8 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        dir="rtl"
        fontFamily="'Vazirmatn', sans-serif"
      >
        <ModalCloseButton
          rounded="full"
          bg="whiteAlpha.800"
          _hover={{ bg: "white" }}
          shadow="md"
          zIndex={10}
          top={4}
          left={4}
        />

        {/* Hero Section */}
        <Box position="relative" h="300px" overflow="hidden">
          <Image
            src={recipe.featured_image || "/placeholder-recipe.jpg"}
            alt={recipe.title}
            w="full"
            h="full"
            objectFit="cover"
            filter="brightness(0.9)"
            transition="filter 0.3s"
            _hover={{ filter: "brightness(1)" }}
            loading="lazy"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.800, transparent 40%)"
          />
          <VStack
            position="absolute"
            bottom={6}
            left={6}
            right={6}
            align="end"
            spacing={2}
            color="white"
            textShadow="0 2px 8px rgba(0,0,0,0.5)"
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              lineHeight="shorter"
              fontFamily="'Almarai', sans-serif"
            >
              {recipe.title}
            </Text>
            {recipe.description && (
              <Text fontSize="sm" opacity={0.9} maxW="80%">
                {recipe.description}
              </Text>
            )}
          </VStack>

          {/* Visibility Badge */}
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme={recipe.visibility === "private" ? "gray" : "green"}
            variant="solid"
            rounded="full"
            px={3}
            py={1.5}
            fontSize="xs"
            fontWeight="bold"
            shadow="lg"
            backdropFilter="blur(4px)"
            fontFamily="'Almarai', sans-serif"
          >
            <Icon as={visibilityIcon} ml={1} />
            {recipe.visibility === "private" ? "خصوصی" : "عمومی"}
          </Badge>
        </Box>

        <ModalBody p={{ base: 6, md: 8 }}>
          <VStack align="stretch" spacing={8}>
            {/* Metadata Grid */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {[
                {
                  icon: FiClock,
                  label: "زمان پخت",
                  value: `${recipe.total_time || 25} دقیقه`,
                  color: "gray.600",
                },
                {
                  icon: FaFire,
                  label: "کالری",
                  value: `${recipe.calories || 520} کالری`,
                  color: "orange.500",
                },
                {
                  icon: FiUsers,
                  label: "تعداد نفرات",
                  value: recipe.servings || 4,
                  color: "blue.500",
                },
                {
                  icon: FiTag,
                  label: "سطح دشواری",
                  value: difficultyLabel,
                  color: "purple.500",
                },
              ].map((item, i) => (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HStack
                    spacing={3}
                    p={3}
                    bg="purple.50"
                    rounded="xl"
                    shadow="sm"
                  >
                    <Icon as={item.icon} color={item.color} boxSize={5} />
                    <VStack align="end" spacing={0}>
                      <Text fontSize="xs" color="gray.500" fontWeight="medium">
                        {item.label}
                      </Text>
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        fontFamily="'Almarai', sans-serif"
                      >
                        {item.value}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </SimpleGrid>

            <Divider borderColor="purple.100" />

            {/* Tags */}
            {Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={3}
                  color="gray.800"
                  fontFamily="'Almarai', sans-serif"
                >
                  برچسب‌ها
                </Text>
                <HStack spacing={2} flexWrap="wrap" gap={2}>
                  {recipe.tags.map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={
                        i % 2 === 0 ? { scale: 0, x: -20 } : { scale: 0, x: 20 }
                      }
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Tag
                        size="lg"
                        variant="solid"
                        colorScheme="purple"
                        rounded="full"
                        px={4}
                        py={2}
                        fontWeight="medium"
                        shadow="sm"
                      >
                        <TagLabel>{tag?.name || tag}</TagLabel>
                      </Tag>
                    </motion.div>
                  ))}
                </HStack>
              </Box>
            )}

            <Divider borderColor="purple.100" />

            {/* Ingredients */}
            <Box>
              <Text
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color="gray.800"
                fontFamily="'Almarai', sans-serif"
              >
                مواد لازم
              </Text>
              <VStack align="stretch" spacing={3}>
                {Array.isArray(recipe.ingredients) &&
                recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ing, i) => (
                    <MotionBox
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <HStack
                        align="start"
                        spacing={3}
                        p={3}
                        bg="purple.50"
                        rounded="xl"
                      >
                        <Box
                          w={4}
                          h={4}
                          bg="purple.500"
                          rounded="full"
                          flexShrink={0}
                          mt={1}
                        />
                        <Text fontSize="sm" color="gray.700">
                          {ing}
                        </Text>
                      </HStack>
                    </MotionBox>
                  ))
                ) : (
                  <Text color="gray.500" fontStyle="italic">
                    ماده‌ای ثبت نشده است.
                  </Text>
                )}
              </VStack>
            </Box>

            <Divider borderColor="purple.100" />

            {/* Instructions */}
            <Box>
              <Text
                fontWeight="bold"
                fontSize="lg"
                mb={4}
                color="gray.800"
                fontFamily="'Almarai', sans-serif"
              >
                مراحل پخت
              </Text>
              <VStack align="stretch" spacing={4}>
                {Array.isArray(recipe.instructions) &&
                recipe.instructions.length > 0 ? (
                  recipe.instructions.map((step, i) => (
                    <MotionBox
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <HStack align="start" spacing={4}>
                        <Badge
                          colorScheme="purple"
                          rounded="full"
                          w={10}
                          h={10}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="lg"
                          fontWeight="bold"
                          shadow="md"
                        >
                          {i + 1}
                        </Badge>
                        <Text
                          flex={1}
                          fontSize="sm"
                          color="gray.700"
                          bg="gray.50"
                          p={4}
                          rounded="xl"
                          border="1px"
                          borderColor="purple.100"
                        >
                          {step}
                        </Text>
                      </HStack>
                    </MotionBox>
                  ))
                ) : (
                  <Text color="gray.500" fontStyle="italic">
                    مرحله‌ای ثبت نشده است.
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Action Buttons */}
            <HStack justify="space-between" mt={8} spacing={4}>
              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                rounded="full"
                flex={1}
                onClick={onClose}
                _hover={{ bg: "gray.100" }}
                fontFamily="'Almarai', sans-serif"
              >
                بستن
              </Button>
              <Button
                colorScheme="purple"
                size="lg"
                rounded="full"
                flex={1}
                fontWeight="bold"
                boxShadow="lg"
                _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                fontFamily="'Almarai', sans-serif"
              >
                شروع پخت
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </MotionModalContent>
    </Modal>
  );
}
