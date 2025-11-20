// components/Scroller.jsx
import React, { useRef, useEffect } from "react";
import { IconButton, Button, Spinner, Center } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

export const Scroller = ({
  currentCategory = "",
  categories = [],
  onSelect,
  isLoading = false,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 220;
    const newScroll =
      direction === "right"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({ left: newScroll, behavior: "smooth" });
  };

  // Auto-scroll to active (including "All")
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(
      `[data-slug="${currentCategory}"]`
    );
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentCategory]);

  // Combine "All" + categories
  const allCategories = [{ id: "all", name: "همه", slug: "" }, ...categories];

  return (
    <div className="flex items-center gap-3 w-full px-1">
      {/* Right Arrow (RTL: scroll to left) */}
      <IconButton
        aria-label="اسکرول به چپ"
        icon={<FiChevronRight />}
        size="sm"
        variant="ghost"
        color="gray.600"
        _hover={{ bg: "purple.50", color: "purple.600" }}
        _active={{ bg: "purple.100" }}
        onClick={() => scroll("right")}
        borderRadius="full"
        boxShadow="sm"
      />

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex-1 flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar py-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        dir="rtl"
      >
        {isLoading ? (
          <Center w="full" py={4}>
            <Spinner size="sm" color="purple.500" />
          </Center>
        ) : allCategories.length === 1 ? (
          <Center w="full" py={4}>
            <p className="text-sm text-gray-500">دسته‌بندی یافت نشد</p>
          </Center>
        ) : (
          allCategories.map((cat) => {
            const isActive = cat.slug === currentCategory;

            return (
              <motion.div
                key={cat.id}
                className="snap-start shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                data-slug={cat.slug}
              >
                <Button
                  as={motion.button}
                  variant={isActive ? "solid" : "outline"}
                  colorScheme="purple"
                  size="sm"
                  onClick={() => onSelect && onSelect(cat.slug)}
                  className="whitespace-nowrap font-medium"
                  px={4}
                  py={5}
                  rounded="full"
                  boxShadow={isActive ? "md" : "sm"}
                  bg={isActive ? "purple.500" : "white"}
                  color={isActive ? "white" : "purple.600"}
                  borderColor={isActive ? "purple.500" : "purple.300"}
                  _hover={{
                    boxShadow: isActive ? "lg" : "md",
                    transform: "translateY(-1px)",
                    bg: isActive ? "purple.600" : "purple.50",
                    color: isActive ? "white" : "purple.700",
                  }}
                  _active={{
                    transform: "translateY(0)",
                    boxShadow: isActive ? "md" : "sm",
                  }}
                  whiteSpace="nowrap"
                  minW="fit-content"
                  fontFamily="'Almarai', sans-serif"
                  animate={{
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {cat.name}
                </Button>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Left Arrow (RTL: scroll to right) */}
      <IconButton
        aria-label="اسکرول به راست"
        icon={<FiChevronLeft />}
        size="sm"
        variant="ghost"
        color="gray.600"
        _hover={{ bg: "purple.50", color: "purple.600" }}
        _active={{ bg: "purple.100" }}
        onClick={() => scroll("left")}
        borderRadius="full"
        boxShadow="sm"
      />
    </div>
  );
};
