// src/store/useRecipesStore.js
import { create } from "zustand";
import {
  fetchAllCategories,
  fetchMyRecipes,
  fetchPublicRecipes,
  fetchRecipeById,
} from "../api";

const useRecipesStore = create((set, get) => ({
  // Public
  publicRecipes: [],
  publicLoading: false,
  publicError: null,
  publicPagination: {
    total: 0,
    totalPages: 0,
    currentPage: 0,
  },

  // Private
  myRecipes: [],
  myLoading: false,
  myError: null,
  myPagination: {},

  // Categories
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  // ... other state
  currentRecipe: null,
  recipeLoading: false,
  recipeError: null,

  // Actions
  getPublicRecipes: async (params = {}) => {
    set({ publicLoading: true, publicError: null });
    try {
      const res = await fetchPublicRecipes(params);
      set({
        publicRecipes: res.data,
        publicPagination: {
          total: +res.headers["x-wp-total"],
          totalPages: +res.headers["x-wp-totalpages"],
          currentPage: 1,
        },
        publicLoading: false,
      });
    } catch (err) {
      set({ publicError: err.message, publicLoading: false });
    }
  },

  loadMorePublicRecipes: async (currentCategory = "") => {
    const { publicPagination, publicLoading } = get();
    if (
      publicLoading ||
      publicPagination.currentPage >= publicPagination.totalPages
    )
      return;

    set({ publicLoading: true });
    try {
      const res = await fetchPublicRecipes({
        per_page: 12,
        page: publicPagination.currentPage + 1,
        category: currentCategory || undefined,
      });

      set((state) => ({
        publicRecipes: [...state.publicRecipes, ...res.data],
        publicPagination: {
          ...state.publicPagination,
          currentPage: state.publicPagination.currentPage + 1,
        },
        publicLoading: false,
      }));
    } catch (err) {
      set({ publicError: err.message, publicLoading: false });
    }
  },

  getCategories: async () => {
    set({ categoriesLoading: true, categoriesError: null });
    try {
      const res = await fetchAllCategories();
      console.log(res.data);
      set({ categories: res.data, categoriesLoading: false });
    } catch (err) {
      set({ categoriesError: err.message, categoriesLoading: false });
    }
  },

  // fetch a single recipe by id
  getRecipeById: async (id) => {
    set({ recipeLoading: true, recipeError: null, currentRecipe: null });
    try {
      console.log("fetch recipe by id");
      const res = await fetchRecipeById(id);
      console.log(res.data);
      set({
        currentRecipe: res.data,
        recipeLoading: false,
      });
    } catch (err) {
      set({
        recipeError: err.message,
        recipeLoading: false,
      });
    }
  },

  clearPublic: () =>
    set({
      publicRecipes: [],
      publicPagination: { total: 0, totalPages: 0, currentPage: 0 },
    }),
}));
export default useRecipesStore;
