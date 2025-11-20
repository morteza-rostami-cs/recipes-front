// components/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  VStack,
  Text,
  Flex,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useSearchStore from "../stores/useSearchStore";
import { truncateText } from "../utils/truncateText";
import { Link, useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { query, setQuery, search, results, loading, pagination, loadMore } =
    useSearchStore();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        search(query, { per_page: 10, page: 1 });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, search]);

  // Infinite scroll
  useEffect(() => {
    if (inView && !loading && pagination.currentPage < pagination.totalPages) {
      loadMore();
    }
  }, [inView, loading, pagination, loadMore]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Fixed: Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Use capture phase to catch clicks early
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <Box ref={dropdownRef} position="relative" w="full" maxW="xl" dir="rtl">
      {/* Search Input */}
      <InputGroup
        size="lg"
        bg="white"
        rounded="full"
        shadow="sm"
        border="1px"
        borderColor={isOpen ? "purple.400" : "gray.200"}
        transition="all 0.3s ease"
        _focusWithin={{
          shadow: "0 0 0 3px rgba(147,51,234,0.3)",
          borderColor: "purple.500",
        }}
      >
        {/* Clear Button (RTL: on left) */}
        {query && (
          <InputLeftElement width="auto" pl={2}>
            <IconButton
              icon={<FiX />}
              size="sm"
              isRound
              variant="ghost"
              colorScheme="gray"
              onClick={clearSearch}
              _hover={{ bg: "purple.50", color: "purple.600" }}
              transition="all 0.2s"
              aria-label="پاک کردن"
            />
          </InputLeftElement>
        )}

        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={handleOpen}
          placeholder="جستجوی دستور پخت..."
          pl={query ? "12" : "12"}
          pr="12"
          py="6"
          fontSize="md"
          fontWeight="medium"
          bg="transparent"
          border="none"
          textAlign="right"
          _placeholder={{
            color: "gray.400",
            textAlign: "right",
            fontFamily: "Vazirmatn, sans-serif",
          }}
          _focus={{ boxShadow: "none" }}
        />

        {/* Search Icon (RTL: on right) */}
        <InputRightElement pointerEvents="none">
          <FiSearch className="w-5 h-5 text-gray-500" />
        </InputRightElement>
      </InputGroup>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={2}
            bg="white"
            rounded="2xl"
            shadow="2xl"
            border="1px"
            borderColor="purple.100"
            overflow="hidden"
            zIndex={50}
            maxH="80vh"
            overflowY="auto"
            textAlign="right"
          >
            <Box p={3}>
              {loading && results.length === 0 ? (
                <Flex justify="center" align="center" py={12}>
                  <Spinner
                    size="lg"
                    color="purple.500"
                    thickness="3px"
                    speed="0.8s"
                  />
                </Flex>
              ) : results.length > 0 ? (
                <VStack spacing={1} align="stretch">
                  {results.map((recipe, i) => (
                    <MotionBox
                      key={recipe.id}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.03,
                        type: "spring",
                        stiffness: 180,
                      }}
                      as="button"
                      w="full"
                      p={4}
                      rounded="xl"
                      _hover={{
                        bg: "purple.50",
                        transform: "translateX(-4px)",
                      }}
                      // transition="all 0.2s"
                      display="flex"
                      alignItems="center"
                      gap={3}
                      justifyContent="flex-end"
                      onClick={() => {
                        navigate(`/recipe/${recipe?.id}`);
                        setIsOpen(false);
                        setQuery("");
                      }}
                    >
                      <Box textAlign="right">
                        <Text
                          fontWeight="semibold"
                          color="gray.800"
                          fontSize="md"
                        >
                          {recipe.title}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {truncateText(recipe.description, 50) || "بدون توضیح"}
                        </Text>
                      </Box>
                      <Avatar
                        size="sm"
                        name={recipe.title}
                        bgGradient="linear(to-bl, purple.500, purple.600)"
                        color="white"
                        fontWeight="bold"
                        boxShadow="md"
                      />
                    </MotionBox>
                  ))}

                  {/* Load More */}
                  {pagination.currentPage < pagination.totalPages && (
                    <Box ref={loadMoreRef} py={2} textAlign="center">
                      {loading ? (
                        <Spinner size="sm" color="purple.500" />
                      ) : (
                        <Text fontSize="sm" color="gray.500">
                          اسکرول کنید تا بیشتر ببینید
                        </Text>
                      )}
                    </Box>
                  )}
                </VStack>
              ) : query ? (
                <VStack spacing={2} py={10} color="gray.500" textAlign="center">
                  <FiSearch className="w-10 h-10 text-purple-300" />
                  <Text fontWeight="medium">دستوری یافت نشد</Text>
                  <Text fontSize="sm">
                    امتحان کنید: "نودل"، "سالاد"، "پروتئین"
                  </Text>
                </VStack>
              ) : (
                <VStack spacing={3} py={10} color="gray.400" textAlign="center">
                  <FiSearch className="w-12 h-12 text-purple-400" />
                  <Text fontSize="sm">شروع به تایپ کنید تا جستجو کنید</Text>
                </VStack>
              )}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
