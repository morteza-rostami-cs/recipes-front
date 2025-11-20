// components/RecipeCard.jsx
import { FaWalking, FaRunning, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Box,
  Image,
  Badge,
  Button,
  HStack,
  Text,
  VStack,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

export default function RecipeCard({
  id,
  title,
  time,
  kcal,
  difficulty,
  image,
  author,
  onStartCooking,
}) {
  return (
    <MotionBox
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      h="full"
      rounded="2xl"
      overflow="hidden"
      bg="white"
      shadow="lg"
      _hover={{ shadow: "2xl", borderColor: "purple.200" }}
      border="1px"
      borderColor="purple.100"
      display="flex"
      flexDir="column"
      dir="rtl"
      textAlign="right"
    >
      {/* Image */}
      <Box position="relative" overflow="hidden" h="200px">
        <Image
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.4s ease-out"
          _groupHover={{ transform: "scale(1.05)" }}
          loading="lazy"
        />
        <Badge
          position="absolute"
          top={3}
          left={3} // RTL: left instead of right
          colorScheme={
            difficulty === "easy"
              ? "green"
              : difficulty === "medium"
              ? "yellow"
              : "red"
          }
          fontSize="xs"
          px={2}
          py={1}
          rounded="full"
          fontWeight="medium"
          fontFamily="'Almarai', sans-serif"
        >
          {difficulty === "easy"
            ? "آسان"
            : difficulty === "medium"
            ? "متوسط"
            : "سخت"}
        </Badge>
      </Box>

      {/* Content */}
      <VStack p={5} spacing={3} align="stretch" flex="1">
        {/* Title */}
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          lineHeight="shorter"
          noOfLines={2}
          fontFamily="'Vazirmatn', sans-serif"
        >
          {title}
        </Text>

        {/* Author Row */}
        <HStack spacing={2} fontSize="sm" color="gray.600" justify="flex-end">
          <Text fontWeight="medium" color="purple.600">
            {author?.name || "آشپز ناشناس"}
          </Text>
          <Avatar
            size="xs"
            name={author?.name}
            src={author?.avatar}
            bg="purple.100"
            color="purple.600"
          >
            <AvatarBadge
              boxSize="1.2em"
              bg="green.500"
              border="2px solid white"
            />
          </Avatar>
        </HStack>

        {/* Stats */}
        <HStack
          spacing={4}
          color="gray.600"
          fontSize="sm"
          justify="space-between"
        >
          <HStack>
            <Text>{time} دقیقه</Text>
            <ClockIcon />
          </HStack>
          <HStack>
            <Text>{kcal} کالری</Text>
            <FireIcon />
          </HStack>
          <HStack>
            {difficulty === "easy" ? (
              <FaWalking className="text-green-500" />
            ) : difficulty === "medium" ? (
              <FaRunning className="text-yellow-500" />
            ) : (
              <FaDumbbell className="text-red-500" />
            )}
          </HStack>
        </HStack>

        {/* Button */}
        <Button
          as={Link}
          to={`/recipe/${id}`}
          mt="auto"
          w="full"
          bg="purple.500"
          color="white"
          size="md"
          rounded="full"
          fontWeight="bold"
          py={7}
          boxShadow="xl"
          whileHover={{ scale: 1.03, boxShadow: "2xl" }}
          whileTap={{ scale: 0.98 }}
          _hover={{ transform: "translateY(-2px)" }}
          onClick={onStartCooking}
          fontFamily="'Almarai', sans-serif"
        >
          شروع آشپزی
        </Button>
      </VStack>
    </MotionBox>
  );
}

// Reusable SVG Icons
function ClockIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 18.657A8 8 0 016.343 7.343S9 10 9 10s3-1.5 3-3c0 2.25 1.5 4.5 1.5 4.5S15 10 15 10s2.25 1.5 2.25 3.75c0 2.25-2.25 3.75-2.25 3.75s-.75 1.5-.75 2.25"
      />
    </svg>
  );
}
