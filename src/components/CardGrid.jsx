// components/CardGrid.jsx
import { SimpleGrid, Center, Text, Box, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Card from "../pages/home/Card";

const MotionBox = motion(Box);

export default function CardGrid({ cards = [], isLoading = false }) {
  // Show loading spinner during fetch
  if (isLoading && cards.length === 0) {
    return (
      <Center py={16}>
        <Spinner size="lg" color="purple.500" thickness="4px" />
      </Center>
    );
  }

  // Show empty state only when NOT loading and empty
  if (!isLoading && cards.length === 0) {
    return (
      <Center py={16}>
        <Text fontSize="lg" color="gray.500" fontWeight="medium">
          No recipes found.
        </Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={6}
      px={{ base: 4, md: 6 }}
      pt={0}
      pb={8}
    >
      {cards.map((card, i) => (
        <MotionBox
          key={card.id || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Card
            title={card.title}
            time={card.total_time}
            kcal={card.calories}
            difficulty={card.difficulty}
            image={card.featured_image}
            author={card.author}
            onStartCooking={card.onStartCooking}
            id={card.id}
          />
        </MotionBox>
      ))}
    </SimpleGrid>
  );
}
