// src/stores/useManageRecipesStore.js
import { create } from "zustand";
import {
  fetchUserRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  fetchPrivateCategories,
} from "../api/index";
import toast from "react-hot-toast";

const useManageRecipesStore = create((set, get) => ({
  // State
  recipes: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 1,
  },
  sortOrder: "newest", // 'desc' = newest first
  crudLoading: false,

  categories: [],
  categoriesLoading: false,

  // Actions
  setSortOrder: (order) => set({ sortOrder: order }),

  fetchRecipes: async ({ page = 1, per_page = 12 } = {}) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchUserRecipes({
        page,
        per_page,
        order: get().sortOrder,
      });

      set({
        recipes: res.data?.map((r) => ({
          ...r,
          categories: r.categories.map((c) => ({
            ...c,
            slug: decodeURIComponent(c.slug),
          })),
          tags: r.tags.map((t) => ({ ...t, slug: decodeURIComponent(t.slug) })),
        })),
        pagination: {
          total: +res.headers["x-wp-total"] || 0,
          totalPages: +res.headers["x-wp-totalpages"] || 0,
          currentPage: page,
        },
        loading: false,
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load recipes";
      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  loadMore: async () => {
    const { pagination, loading } = get();
    if (loading || pagination.currentPage >= pagination.totalPages) return;

    await get().fetchRecipes({
      page: pagination.currentPage + 1,
      per_page: 12,
    });
  },

  create: async (data) => {
    set({ crudLoading: true });

    // Step 1: Show loading toast
    const loadingToast = toast.loading("Creating your recipe...", {
      style: { borderRadius: "12px", fontWeight: "medium" },
    });

    try {
      const res = await createRecipe(data);

      // Step 2: Update state
      set((state) => ({
        recipes: [res.data, ...state.recipes],
        crudLoading: false,
      }));

      // Step 3: Replace loading → success
      // toast.success("Recipe created!", {
      //   id: loadingToast, // Replace the loading one
      //   duration: 4000,
      // });

      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create recipe";

      set({ crudLoading: false });

      // Step 4: Replace loading → error
      toast.error(msg, {
        id: loadingToast, // Replace loading toast
        duration: 5000,
      });

      throw err;
    }
  },

  update: async (id, data) => {
    set({ crudLoading: true });
    try {
      const res = await updateRecipe(id, data);
      set((state) => ({
        recipes: state.recipes.map((r) => (r.id === id ? res.data : r)),
        crudLoading: false,
      }));
      // toast.success("Recipe updated!", { duration: 6000 });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update recipe";
      set({ crudLoading: false });
      toast.error(msg);
      throw err;
    }
  },

  remove: async (id) => {
    set({ crudLoading: true });
    try {
      await deleteRecipe(id);
      set((state) => ({
        recipes: state.recipes.filter((r) => r.id !== id),
        crudLoading: false,
      }));
      toast.success("Recipe deleted", { duration: 6000 });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete recipe";
      set({ crudLoading: false });
      toast.error(msg, { duration: 6000 });
    }
  },

  getAllCategories: async ({ page = 1, per_page = 12 } = {}) => {
    set({ categoriesLoading: true, error: null });

    try {
      const res = await fetchPrivateCategories({ page, per_page });

      set({
        categories: res.data?.map((c) => ({
          ...c,
          slug: decodeURIComponent(c.slug),
        })),
        pagination: {
          total: +res.headers["x-wp-total"] || 0,
          totalPages: +res.headers["x-wp-totalpages"] || 0,
          currentPage: page,
        },
        categoriesLoading: false,
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load categories";
      set({ error: msg, categoriesLoading: false });
      toast.error(msg);
    }
  },
  // Refresh current page
  refresh: () => get().fetchRecipes({ page: get().pagination.currentPage }),
}));

// Subscribe & Log State on Any Change
useManageRecipesStore.subscribe((state) => {
  console.log("useManageRecipesStore");
  console.table({
    total: state.pagination.total,
    page: state.pagination.currentPage,
    totalPages: state.pagination.totalPages,
    sortOrder: state.sortOrder,
    loading: state.loading,
    error: state.error,
    recipeCount: state.recipes.length,
  });
});

export default useManageRecipesStore;
