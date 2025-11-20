import api from "./axiosInstance";

/**
 * Fetch public recipes
 * @param {Object} params - Query params: search, page, per_page, category, tag
 */
export const fetchPublicRecipes = (params = {}) => {
  // decode url-encoded category.slug
  console.log(params);
  if (params?.category) {
    params = { ...params, category: decodeURIComponent(params?.category) };
  }

  return api.get("/recipe-auth/v1/recipes", { params });
};

export const fetchMyRecipes = (params = {}) => {
  return api.get("/recipe-auth/v1/user/recipes", { params });
};

/**
 * Send OTP to email or phone
 */
export const sendOtp = ({ phone, email }) => {
  return api.post("/recipe-auth/v1/login", { phone, email });
};

/**
 * Verify OTP and login
 */
export const verifyOtp = ({ email, phone, otp }) => {
  return api.post("/recipe-auth/v1/verify", { email, phone, otp });
};

/**
 * Get current user (after login)
 */
export const getCurrentUser = () => {
  return api.get("/recipe-auth/v1/me");
};

/**
 * Logout
 */
export const logoutUser = () => {
  return api.post("/recipe-auth/v1/logout");
};

// fetch all categories
export const fetchAllCategories = () =>
  api.get("/recipe-auth/v1/recipe-categories", { params: { per_page: 100 } });

export const fetchRecipeById = (id) => {
  return api.get(`/recipe-auth/v1/recipes/${id}`);
};

// Search recipes
export const searchRecipes = (query, { per_page = 12, page = 1 } = {}) =>
  api.get("/recipe-auth/v1/recipes", {
    params: {
      search: query,
      per_page,
      page,
    },
  });

/* ------------------- USER RECIPES ------------------- */
export const fetchUserRecipes = ({
  per_page = 12,
  page = 1,
  order = "newest", // newest
} = {}) => {
  return api.get("/recipe-auth/v1/user/recipes", {
    params: { author: "me", per_page, page, sort: order }, // 'me' = current user
  });
};

/* ------------------- CREATE ------------------- */
export const createRecipe = (data) =>
  api.post("/recipe-auth/v1/user/recipes/create", data);

/* ------------------- UPDATE ------------------- */
export const updateRecipe = (id, data) =>
  api.post(`/recipe-auth/v1/user/recipes/${id}/edit`, data);

/* ------------------- DELETE ------------------- */
export const deleteRecipe = (id) =>
  api.delete(`/recipe-auth/v1/user/recipes/${id}`);

export const fetchPrivateCategories = () => {
  return api.get(`recipe-auth/v1/categories/all`);
};

export const googleAuth = () => {
  return api.get(`recipe-auth/v1/google/start`);
};
