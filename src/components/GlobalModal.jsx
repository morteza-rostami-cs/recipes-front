// components/GlobalModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useColorModeValue,
  Box,
  Fade,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useModalStore } from "../stores/modalStore";

const MotionContent = motion(ModalContent);

export const GlobalModal = () => {
  const { isOpen, content, props, closeModal } = useModalStore();
  const bg = useColorModeValue("white", "gray.800");

  if (!isOpen) return null;

  const animate = props.animate !== false; // default = true

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size={props.size ?? "md"}
      scrollBehavior={props.scrollBehavior ?? "outside"}
      isCentered
      closeOnOverlayClick
      closeOnEsc
    >
      {/* Backdrop with subtle blur + fade */}
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
        transition="all 0.2s"
      />

      <MotionContent
        bg={bg}
        rounded="2xl"
        shadow="2xl"
        maxW={props.maxW ?? "4xl"}
        mx={{ base: 4, md: 6 }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{
          duration: 0.12, // ← 120ms – feels instant
          ease: "easeOut",
        }}
      >
        {/* Header – only if a title is supplied */}
        {props.title && (
          <ModalHeader
            fontWeight="extrabold"
            fontSize="xl"
            bgGradient="linear(to-r, purple.600, purple.800)"
            bgClip="text"
            textAlign="center"
            py={4}
          >
            {props.title}
          </ModalHeader>
        )}

        {/* Close button – always on top-right, focusable */}
        <ModalCloseButton
          rounded="full"
          size="lg"
          _focus={{ ring: 2, ringColor: "purple.400" }}
        />

        {/* Body – padded, scrollable, centered */}
        <ModalBody p={6} maxH="70vh" overflowY="auto">
          <Box>{content}</Box>
        </ModalBody>
      </MotionContent>
    </Modal>
  );
};
