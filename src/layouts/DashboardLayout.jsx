// layouts/DashboardLayout.jsx
import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  VStack,
  Badge,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiActivity,
  FiBookOpen,
  FiCalendar,
  FiMessageSquare,
  FiDollarSign,
  FiSettings,
  FiHelpCircle,
  FiSearch,
  FiChevronDown,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SidebarContent from "./SidebarContent";
import useUsersStore from "../stores/usersStore";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

export default function DashboardLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { getUser, logout } = useUsersStore();
  const user = getUser();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();

  return (
    <Flex
      minH="100vh"
      overflow="hidden"
      bg="gray.50"
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
    >
      {/* Desktop Sidebar */}
      <Box
        as={motion.div}
        initial={{ width: sidebarOpen ? 280 : 80 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        bg="white"
        borderLeft="1px"
        borderColor="purple.100"
        h="full"
        pos="fixed"
        right={0}
        top={0}
        zIndex={10}
        display={{ base: "none", md: "block" }}
        overflowY="auto"
        boxShadow="lg"
      >
        <SidebarContent
          currentPath={location.pathname}
          sidebarOpen={sidebarOpen}
          onClose={onClose}
          toggleSidebar={toggleSidebar}
        />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="white">
          <Flex justify="flex-start" p={4}>
            <IconButton icon={<FiX />} onClick={onClose} variant="ghost" />
          </Flex>
          <SidebarContent
            sidebarOpen={true}
            onClose={onClose}
            toggleSidebar={() => {}}
            isMobile
            currentPath={location.pathname}
          />
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Box
        flex={1}
        mr={{ base: 0, md: sidebarOpen ? "280px" : "80px" }}
        transition="margin 0.3s ease"
      >
        {/* Header */}
        <Box
          as="header"
          bg="white"
          borderBottom="1px"
          borderColor="purple.100"
          px={{ base: 4, lg: 8 }}
          py={4}
          position="sticky"
          top={0}
          zIndex={5}
          boxShadow="sm"
        >
          <Flex align="center" justify="space-between" gap={4}>
            {/* Mobile Menu */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              icon={<FiMenu />}
              variant="ghost"
              size="md"
              rounded="full"
              _hover={{ bg: "purple.50" }}
              aria-label="منو"
            />

            {/* Search Bar (Desktop) */}
            <Box flex={1} maxW="500px" display={{ base: "none", lg: "block" }}>
              <SearchBar />
            </Box>

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={MotionFlex}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                align="center"
                gap={3}
                cursor="pointer"
                px={3}
                py={2}
                rounded="full"
                bg="purple.50"
                _hover={{ bg: "purple.100" }}
                transition="all 0.2s"
              >
                <HStack spacing={3}>
                  <Avatar
                    size="sm"
                    name={user?.displayName}
                    src={user?.avatar}
                    border="2px solid"
                    borderColor="purple.300"
                    bg="purple.100"
                  />
                  <VStack
                    align="end"
                    spacing={0}
                    display={{ base: "none", md: "flex" }}
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="gray.800"
                      fontFamily="'Almarai', sans-serif"
                    >
                      {user?.displayName || "کاربر"}
                    </Text>
                    <HStack spacing={1}>
                      <Badge
                        colorScheme="purple"
                        variant="subtle"
                        fontSize="2xs"
                        rounded="full"
                        px={2}
                      >
                        {user?.roles?.[0] === "admin"
                          ? "مدیر"
                          : user?.roles?.[0] === "editor"
                          ? "ویراستار"
                          : "کاربر"}
                      </Badge>
                    </HStack>
                  </VStack>
                  <FiChevronDown color="purple.600" />
                </HStack>
              </MenuButton>

              <MenuList
                shadow="xl"
                rounded="xl"
                py={3}
                minW="220px"
                border="none"
                bg="white"
                fontFamily="'Vazirmatn', sans-serif"
              >
                <MenuItem
                  // as={Link}
                  // to="/profile"
                  py={3}
                  _hover={{ bg: "purple.50", color: "purple.700" }}
                  fontWeight="medium"
                >
                  پروفایل
                </MenuItem>
                <MenuItem
                  // as={Link}
                  // to="/settings"
                  py={3}
                  _hover={{ bg: "purple.50", color: "purple.700" }}
                  fontWeight="medium"
                >
                  تنظیمات
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={logout}
                  color="red.600"
                  py={3}
                  _hover={{ bg: "red.50", color: "red.700" }}
                  fontWeight="medium"
                >
                  <FiLogOut className="ml-2" />
                  خروج
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>

        {/* Main Content */}
        <Box p={{ base: 4, md: 8 }} minH="calc(100vh - 73px)" overflowY="auto">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
