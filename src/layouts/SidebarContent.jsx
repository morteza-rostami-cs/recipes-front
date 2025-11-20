// layouts/SidebarContent.jsx
// import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  VStack,
  Badge,
  Divider,
} from "@chakra-ui/react";
import {
  FiHome,
  FiBookOpen,
  FiActivity,
  FiMessageSquare,
  FiDollarSign,
  FiCalendar,
  FiSettings,
  FiHelpCircle,
  FiChevronLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const navItems = [
  { name: "داشبورد", icon: FiHome, path: "/dashboard" },
  { name: "دستورهای من", icon: FiBookOpen, path: "/#" },
  { name: "تحلیل‌ها", icon: FiActivity, path: "/#" },
  {
    name: "پیام‌ها",
    icon: FiMessageSquare,
    path: "/#",
    badge: 3,
  },
  { name: "درآمد", icon: FiDollarSign, path: "/#" },
  { name: "تقویم", icon: FiCalendar, path: "/#" },
];

const bottomItems = [
  { name: "تنظیمات", icon: FiSettings, path: "/#" },
  { name: "راهنما", icon: FiHelpCircle, path: "/#" },
];

export default function SidebarContent({
  sidebarOpen,
  onClose,
  currentPath,
  toggleSidebar,
  isMobile,
}) {
  return (
    <Box
      h="full"
      bg="white"
      pb={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      fontFamily="'Vazirmatn', sans-serif"
      dir="rtl"
    >
      {/* Top Section */}
      <VStack align="stretch" spacing={0} className="mt-2">
        {/* Logo */}
        <Flex
          h="16"
          align="center"
          mx={4}
          justify="space-between"
          borderBottom="1px"
          borderColor="purple.100"
          pb={4}
        >
          <Flex align="center" gap={3} as={Link} to="/" onClick={onClose}>
            <Box
              w={10}
              h={10}
              bgGradient="linear(to-bl, purple.500, purple.700)"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="extrabold"
              fontSize="lg"
              boxShadow="md"
              fontFamily="'Almarai', sans-serif"
            >
              سرآشپز
            </Box>
            {sidebarOpen && (
              <Text
                fontWeight="bold"
                fontSize="xl"
                bgGradient="linear(to-r, purple.600, purple.800)"
                bgClip="text"
                fontFamily="'Almarai', sans-serif"
              >
                سرآشپز
              </Text>
            )}
          </Flex>

          {!isMobile && (
            <Tooltip label={sidebarOpen ? "بسته" : "باز"} placement="left">
              <IconButton
                size="sm"
                icon={<FiChevronLeft />}
                onClick={toggleSidebar}
                variant="ghost"
                rounded="full"
                color="gray.500"
                _hover={{ bg: "purple.50", color: "purple.600" }}
                transform={sidebarOpen ? "rotate(0deg)" : "rotate(180deg)"}
                transition="transform 0.2s"
                aria-label={sidebarOpen ? "فشرده کردن" : "گسترش دادن"}
              />
            </Tooltip>
          )}
        </Flex>

        {/* Main Nav */}
        <VStack align="stretch" mt={6} spacing={1} px={2}>
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.path);
            return (
              <Tooltip
                key={item.name}
                label={item.name}
                placement="left"
                isDisabled={sidebarOpen}
              >
                <MotionFlex
                  as={Link}
                  to={item.path}
                  onClick={onClose}
                  align="center"
                  justify="space-between"
                  px={4}
                  py={3}
                  mx={2}
                  borderRadius="xl"
                  role="group"
                  cursor="pointer"
                  fontWeight={isActive ? "bold" : "medium"}
                  color={isActive ? "purple.700" : "gray.600"}
                  bg={isActive ? "purple.50" : "transparent"}
                  _hover={{
                    bg: "purple.50",
                    color: "purple.600",
                    transform: "translateX(-4px)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition="all 0.2s"
                  position="relative"
                >
                  {/* Text (only when open) */}
                  {sidebarOpen && (
                    <Text fontFamily="'Vazirmatn', sans-serif" flex={1}>
                      {item.name}
                    </Text>
                  )}

                  {/* Badge (only when open) */}
                  {sidebarOpen && item.badge && (
                    <Badge
                      colorScheme="red"
                      variant="solid"
                      rounded="full"
                      fontSize="2xs"
                      px={2}
                    >
                      {item.badge}
                    </Badge>
                  )}

                  {/* Icon (always visible, on the right) */}
                  <Box as={item.icon} boxSize="20px" />

                  {/* Badge dot (only when collapsed) */}
                  {!sidebarOpen && item.badge && (
                    <Box
                      position="absolute"
                      top="8px"
                      left="8px"
                      w={2}
                      h={2}
                      bg="red.500"
                      rounded="full"
                    />
                  )}
                </MotionFlex>
              </Tooltip>
            );
          })}
        </VStack>
      </VStack>

      {/* Bottom Section */}
      <VStack align="stretch" spacing={1} px={2} pb={4}>
        <Divider borderColor="purple.100" />
        {bottomItems.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Tooltip
              key={item.name}
              label={item.name}
              placement="left"
              isDisabled={sidebarOpen}
            >
              <MotionFlex
                as={Link}
                to={item.path}
                onClick={onClose}
                align="center"
                justify="space-between"
                px={4}
                py={3}
                mx={2}
                borderRadius="xl"
                cursor="pointer"
                fontWeight={isActive ? "bold" : "medium"}
                color={isActive ? "purple.700" : "gray.500"}
                bg={isActive ? "purple.50" : "transparent"}
                _hover={{
                  bg: "purple.50",
                  color: "purple.600",
                  transform: "translateX(-4px)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition="all 0.2s"
              >
                {/* Text (only when open) */}
                {sidebarOpen && (
                  <Text fontFamily="'Vazirmatn', sans-serif" flex={1}>
                    {item.name}
                  </Text>
                )}

                {/* Icon (always on right) */}
                <Box as={item.icon} boxSize="20px" />
              </MotionFlex>
            </Tooltip>
          );
        })}
      </VStack>
    </Box>
  );
}
