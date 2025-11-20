// components/CreateRecipeForm.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  SimpleGrid,
  Icon,
  InputGroup,
  InputLeftElement,
  Divider,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import {
  FiUploadCloud,
  FiClock,
  FiUsers,
  FiLock,
  FiGlobe,
  FiTag,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useManageRecipesStore from "../../stores/useManageRecipeStore";

const MotionButton = motion(Button);
const difficulties = [
  { value: "easy", label: "آسان" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "سخت" },
];

export default function CreateRecipeForm({
  initialData,
  mode = "create",
  onSuccess,
}) {
  const isEdit = mode === "edit";
  const [tags, setTags] = useState(
    Array.isArray(initialData?.tags)
      ? initialData.tags.map((t) => t.slug || t)
      : []
  );
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const imageInputRef = useRef(null);

  const {
    create,
    update,
    crudLoading,
    getAllCategories,
    categoriesLoading,
    categories,
  } = useManageRecipesStore();

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    if (isEdit && initialData?.featured_image) {
      setImagePreview(initialData.featured_image);
      setHasImage(true);
    }
  }, [initialData, isEdit]);
  console.log(initialData);
  const defaultValues = isEdit
    ? {
        name: initialData.title || "",
        description: initialData.description || "",
        totalTime: initialData.total_time || "",
        calories: initialData.calories || "",
        servings: initialData.servings || "",
        protein: initialData.protein || "",
        carbs: initialData.carbs || "",
        fat: initialData.fat || "",
        fiber: initialData.fiber || "",
        difficulty: initialData.difficulty || "",
        visibility: initialData.visibility || "public",
        category: initialData.categories?.[0]?.slug || "",
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join("\n")
          : "",
        instructions: Array.isArray(initialData.instructions)
          ? initialData.instructions.join("\n")
          : "",
      }
    : {
        visibility: "public",
      };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim()) {
        setTags((prev) => [...prev, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setHasImage(true);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setHasImage(false);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const onSubmit = async (data) => {
    const file = imageInputRef.current?.files[0];
    const ingredients = data.ingredients
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const instructions = data.instructions
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const formData = new FormData();
    const payload = {
      title: data.name,
      description: data.description,
      total_time: data.totalTime,
      calories: data.calories,
      servings: data.servings,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      fiber: data.fiber,
      difficulty: data.difficulty,
      visibility: data.visibility,
      category: data.category,
      ingredients,
      instructions,
      tags,
    };

    console.log(payload);
    return;

    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (file) {
      formData.append("featured_image", file);
    } else if (isEdit && !hasImage) {
      formData.append("featured_image", "delete");
    }

    try {
      if (isEdit) {
        await update(initialData.id, formData);
      } else {
        await create(formData);
      }
      onSuccess?.();
    } catch (err) {
      console.error("Form submit error:", err);
    }
  };
  console.log(categories);
  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={{ base: 4, md: 8 }}
      bg="white"
      rounded="2xl"
      shadow="xl"
      dir="rtl"
      fontFamily="'Vazirmatn', sans-serif"
    >
      <Text
        fontSize="2xl"
        fontWeight="extrabold"
        bgGradient="linear(to-l, purple.600, purple.800)"
        bgClip="text"
        mb={8}
        fontFamily="'Almarai', sans-serif"
      >
        {isEdit ? "ویرایش دستور" : "ایجاد دستور جدید"}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={7} align="stretch">
          {/* Recipe Name */}
          <FormControl isInvalid={errors.name}>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              نام دستور
            </FormLabel>
            <Input
              placeholder="مثلاً: نودل گوشت تند"
              size="lg"
              rounded="xl"
              border="2px"
              borderColor={errors.name ? "red.400" : "purple.100"}
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
              }}
              {...register("name", { required: "نام دستور الزامی است" })}
            />
            {errors.name && (
              <Text
                color="red.500"
                fontSize="sm"
                mt={1}
                fontFamily="'Vazirmatn', sans-serif"
              >
                {errors.name.message}
              </Text>
            )}
          </FormControl>

          {/* Category & Difficulty */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isInvalid={errors.category}>
              <FormLabel
                fontWeight="semibold"
                color="gray.700"
                fontFamily="'Almarai', sans-serif"
              >
                دسته‌بندی
              </FormLabel>
              <Skeleton isLoaded={!categoriesLoading}>
                <Select
                  placeholder="انتخاب دسته‌بندی"
                  size="lg"
                  rounded="xl"
                  border="2px"
                  borderColor="purple.100"
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
                  }}
                  {...register("category", {
                    required: "دسته‌بندی الزامی است",
                  })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Skeleton>
            </FormControl>

            <FormControl isInvalid={errors.difficulty}>
              <FormLabel
                fontWeight="semibold"
                color="gray.700"
                fontFamily="'Almarai', sans-serif"
              >
                سطح دشواری
              </FormLabel>
              <Select
                placeholder="انتخاب سطح دشواری"
                size="lg"
                rounded="xl"
                border="2px"
                borderColor="purple.100"
                _focus={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
                }}
                {...register("difficulty", {
                  required: "سطح دشواری الزامی است",
                })}
              >
                {difficulties.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </SimpleGrid>

          {/* Featured Image */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              تصویر شاخص
            </FormLabel>
            <Box
              border="3px dashed"
              borderColor="purple.200"
              borderRadius="2xl"
              p={8}
              textAlign="center"
              cursor="pointer"
              bg="purple.50"
              transition="all 0.3s"
              _hover={{
                borderColor: "purple.400",
                bg: "purple.100",
                transform: "translateY(-2px)",
              }}
              onClick={() => imageInputRef.current?.click()}
            >
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <VStack spacing={3}>
                  <Image
                    src={imagePreview}
                    alt="پیش‌نمایش"
                    maxH="240px"
                    mx="auto"
                    rounded="xl"
                    shadow="lg"
                    border="4px solid white"
                  />
                  {isEdit && (
                    <HStack>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          imageInputRef.current.click();
                        }}
                        fontFamily="'Almarai', sans-serif"
                      >
                        جایگزین
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage();
                        }}
                        fontFamily="'Almarai', sans-serif"
                      >
                        حذف
                      </Button>
                    </HStack>
                  )}
                </VStack>
              ) : (
                <VStack spacing={3} color="purple.600">
                  <Icon as={FiUploadCloud} w={12} h={12} />
                  <Text fontWeight="medium" fontFamily="'Almarai', sans-serif">
                    برای آپلود کلیک کنید
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    JPG، PNG تا ۵ مگابایت
                  </Text>
                </VStack>
              )}
            </Box>
          </FormControl>

          {/* Time, Calories, Servings */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                label: "زمان کل (دقیقه)",
                icon: FiClock,
                field: "totalTime",
                placeholder: "۲۵",
              },
              {
                label: "کالری",
                icon: FaFire,
                field: "calories",
                placeholder: "۵۲۰",
              },
              {
                label: "تعداد نفرات",
                icon: FiUsers,
                field: "servings",
                placeholder: "۴",
              },
            ].map((item) => (
              <FormControl key={item.field}>
                <FormLabel
                  fontWeight="semibold"
                  color="gray.700"
                  fontFamily="'Almarai', sans-serif"
                >
                  <Icon as={item.icon} ml={1} /> {item.label}
                </FormLabel>
                <Input
                  type="number"
                  placeholder={item.placeholder}
                  size="lg"
                  rounded="xl"
                  border="2px"
                  borderColor="purple.100"
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
                  }}
                  {...register(item.field)}
                />
              </FormControl>
            ))}
          </SimpleGrid>

          {/* Nutrition */}
          <Box>
            <Text
              fontWeight="bold"
              fontSize="lg"
              mb={4}
              color="gray.800"
              fontFamily="'Almarai', sans-serif"
            >
              ارزش غذایی در هر وعده
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              {[
                { field: "protein", label: "پ" },
                { field: "carbs", label: "ک" },
                { field: "fat", label: "چ" },
                { field: "fiber", label: "ف" },
              ].map((nut) => (
                <InputGroup key={nut.field}>
                  <InputLeftElement
                    pointerEvents="none"
                    color="purple.600"
                    fontWeight="bold"
                    children={nut.label}
                  />
                  <Input
                    placeholder={`${nut.label} (گرم)`}
                    size="lg"
                    rounded="xl"
                    border="2px"
                    borderColor="purple.100"
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
                    }}
                    {...register(nut.field)}
                  />
                </InputGroup>
              ))}
            </SimpleGrid>
          </Box>

          <Divider borderColor="purple.100" />

          {/* Visibility */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              دسترسی
            </FormLabel>
            <RadioGroup defaultValue={defaultValues.visibility}>
              <Stack direction={{ base: "column", md: "row" }} spacing={6}>
                {[
                  { value: "public", icon: FiGlobe, label: "عمومی" },
                  { value: "private", icon: FiLock, label: "خصوصی" },
                ].map((opt) => (
                  <Radio
                    key={opt.value}
                    value={opt.value}
                    colorScheme="purple"
                    size="lg"
                    {...register("visibility")}
                    sx={{
                      ".chakra-radio__control": {
                        borderRadius: "xl",
                        p: 5,
                        bg: "white",
                        border: "2px solid",
                        borderColor: "purple.100",
                        _checked: {
                          bg: "purple.50",
                          borderColor: "purple.500",
                        },
                      },
                      ".chakra-radio__label": { mr: 3, fontWeight: "medium" },
                    }}
                  >
                    <HStack>
                      <Icon as={opt.icon} />
                      <Text fontFamily="'Almarai', sans-serif">
                        {opt.label}
                      </Text>
                    </HStack>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Text
              fontSize="sm"
              color="gray.500"
              mt={2}
              fontFamily="'Vazirmatn', sans-serif"
            >
              عمومی: همه می‌توانند ببینند | خصوصی: فقط شما دسترسی دارید
            </Text>
          </FormControl>

          {/* Tags */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              <Icon as={FiTag} ml={1} /> برچسب‌ها
            </FormLabel>
            <Input
              placeholder="برچسب را تایپ کنید و Enter بزنید"
              size="lg"
              rounded="xl"
              border="2px"
              borderColor="purple.100"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
              }}
            />
            <HStack mt={3} flexWrap="wrap" gap={2}>
              {tags.map((tag, i) => (
                <Tag
                  key={i}
                  size="lg"
                  colorScheme="purple"
                  variant="solid"
                  rounded="full"
                  px={4}
                  py={2}
                  fontWeight="medium"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(i)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          {/* Description */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              توضیحات
            </FormLabel>
            <Textarea
              placeholder="توضیح مختصر درباره دستور..."
              size="lg"
              rows={4}
              rounded="xl"
              border="2px"
              borderColor="purple.100"
              resize="none"
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
              }}
              {...register("description")}
            />
          </FormControl>

          {/* Ingredients */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              مواد لازم (یکی در هر خط)
            </FormLabel>
            <Textarea
              placeholder="۳۰۰ گرم گوشت راسته، نازک برش خورده\n۲۰۰ گرم نودل تخم‌مرغ خشک"
              size="lg"
              rows={6}
              rounded="xl"
              border="2px"
              borderColor="purple.100"
              resize="none"
              fontFamily="mono"
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
              }}
              {...register("ingredients")}
            />
          </FormControl>

          {/* Instructions */}
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              color="gray.700"
              fontFamily="'Almarai', sans-serif"
            >
              مراحل پخت (یکی در هر خط)
            </FormLabel>
            <Textarea
              placeholder="۱. نودل را طبق دستور روی بسته بپزید...\n۲. روغن را در وک داغ کنید..."
              size="lg"
              rows={7}
              rounded="xl"
              border="2px"
              borderColor="purple.100"
              resize="none"
              fontFamily="mono"
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.2)",
              }}
              {...register("instructions")}
            />
          </FormControl>

          {/* Submit */}
          <MotionButton
            isLoading={crudLoading || isSubmitting}
            type="submit"
            colorScheme="purple"
            size="lg"
            w="full"
            py={7}
            rounded="full"
            fontWeight="bold"
            fontSize="lg"
            boxShadow="xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            _hover={{ transform: "translateY(-2px)", boxShadow: "2xl" }}
            fontFamily="'Almarai', sans-serif"
          >
            {isEdit ? "ذخیره تغییرات" : "ایجاد دستور"}
          </MotionButton>
        </VStack>
      </form>
    </Box>
  );
}
