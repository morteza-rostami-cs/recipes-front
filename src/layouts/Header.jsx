// components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiLogOut, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import PLogo from "../components/PLogo";

import useUsersStore from "../stores/usersStore";
import IfAuth from "../guards/IfAuth";
import IfGuest from "../guards/IfGuest";

const MotionMenuButton = motion(MenuButton);

export default function Header() {
  const { user, logout } = useUsersStore();

  const handleLogout = () => logout();

  return (
    <Box
      as="header"
      bg="white"
      shadow="lg"
      position="sticky"
      top={0}
      zIndex={50}
      borderBottom="1px"
      borderColor="purple.100"
      dir="rtl"
    >
      {/* Manual SEO */}
      <>
        <title>سرآشپز – خانه</title>
        <meta
          name="description"
          content="دستور پخت‌های خوشمزه ایرانی و جهانی"
        />
      </>

      <Container styles="px-4 py-2">
        <Flex
          align="center"
          h={16}
          justify="space-between"
          gap={{ base: 2, md: 4 }}
        >
          {/* Auth / User Menu */}
          <Box>
            <IfAuth>
              <Menu>
                <MotionMenuButton
                  as={IconButton}
                  aria-label="منوی کاربر"
                  icon={
                    <Flex align="center" gap={2}>
                      <Avatar
                        size="sm"
                        name={user?.displayName}
                        src={user?.avatar}
                        bg="purple.100"
                        color="purple.700"
                        border="2px solid"
                        borderColor="purple.300"
                      />
                      <ChevronDownIcon w={5} h={5} color="gray.600" />
                    </Flex>
                  }
                  variant="ghost"
                  rounded="full"
                  p={2}
                  _hover={{ bg: "purple.50" }}
                  _active={{ bg: "purple.100" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                <MenuList
                  py={3}
                  px={2}
                  border="none"
                  shadow="2xl"
                  rounded="xl"
                  minW="260px"
                  bg="white"
                  textAlign="right"
                >
                  <Box px={4} pb={3} borderBottom="1px" borderColor="gray.200">
                    <Text fontWeight="bold" fontSize="md" color="gray.800">
                      {user?.displayName}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      dir="ltr"
                      fontFamily="monospace"
                    >
                      {user?.email}
                    </Text>
                  </Box>

                  <MenuItem
                    as={Link}
                    to="/dashboard"
                    py={3}
                    px={4}
                    rounded="lg"
                    _hover={{ bg: "purple.50", color: "purple.700" }}
                    fontWeight="medium"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Icon as={FiHome} />
                    داشبورد
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogout}
                    py={3}
                    px={4}
                    rounded="lg"
                    color="red.600"
                    _hover={{ bg: "red.50", color: "red.700" }}
                    fontWeight="medium"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Icon as={FiLogOut} />
                    خروج
                  </MenuItem>
                </MenuList>
              </Menu>
            </IfAuth>

            <IfGuest>
              <Button
                as={Link}
                to="/login"
                bg="purple.500"
                color="white"
                size="md"
                px={6}
                py={5}
                rounded="full"
                fontWeight="bold"
                boxShadow="xl"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "2xl",
                }}
                _active={{ transform: "translateY(0)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                ورود
              </Button>
            </IfGuest>
          </Box>

          {/* Search Bar (Desktop Only) */}
          <Box
            className="hidden md:block"
            flex="1"
            maxW={{ md: "md", lg: "xl" }}
            mx={{ md: 4, lg: 8 }}
          >
            <SearchBar />
          </Box>

          {/* Logo */}
          <Box flexShrink={0} as={Link} to="/">
            <PLogo />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
