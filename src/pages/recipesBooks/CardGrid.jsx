// components/CardGrid.jsx
import { SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionGrid = motion(SimpleGrid);

export default function CardGrid({ children }) {
  return (
    <MotionGrid
      columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={{ base: 5, md: 6, lg: 7 }}
      pt={0}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      dir="rtl"
    >
      {children}
    </MotionGrid>
  );
}
