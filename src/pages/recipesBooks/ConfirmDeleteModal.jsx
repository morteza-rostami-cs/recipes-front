// components/ConfirmDeleteModal.jsx
import { VStack, Text, HStack, Icon, Button } from "@chakra-ui/react";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <VStack
      spacing={5}
      align="center"
      p={4}
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
    >
      {/* Warning icon + title */}
      <VStack spacing={2}>
        <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" />
        <Text
          fontSize="lg"
          fontWeight="bold"
          fontFamily="'Almarai', sans-serif"
        >
          حذف دستور؟
        </Text>
      </VStack>

      {/* Description */}
      <Text color="gray.600" fontSize="sm" textAlign="center">
        این عمل <strong>قابل بازگشت نیست</strong>. دستور پخت برای همیشه حذف
        خواهد شد.
      </Text>

      {/* Buttons */}
      <HStack spacing={4} w="full" justify="center">
        <MotionButton
          variant="outline"
          colorScheme="gray"
          size="lg"
          flex={1}
          rounded="full"
          onClick={onCancel}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          fontFamily="'Almarai', sans-serif"
        >
          لغو
        </MotionButton>

        <MotionButton
          rightIcon={<FiTrash2 />}
          colorScheme="red"
          size="lg"
          flex={1}
          rounded="full"
          onClick={onConfirm}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          _hover={{ bg: "red.600" }}
          fontFamily="'Almarai', sans-serif"
        >
          حذف
        </MotionButton>
      </HStack>
    </VStack>
  );
}
