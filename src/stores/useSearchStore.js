// src/stores/useSearchStore.js
import { create } from "zustand";
import { searchRecipes } from "../api";

const useSearchStore = create((set, get) => ({
  // State
  query: "",
  results: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 0,
  },

  // Actions
  setQuery: (query) => set({ query }),

  search: async (query, { per_page = 12, page = 1 } = {}) => {
    if (!query?.trim()) {
      set({
        results: [],
        query: "",
        pagination: { total: 0, totalPages: 0, currentPage: 0 },
      });
      return;
    }

    set({ loading: true, error: null, query });

    try {
      const res = await searchRecipes(query, { per_page, page });

      set({
        results: res.data,
        pagination: {
          total: +res.headers["x-wp-total"] || 0,
          totalPages: +res.headers["x-wp-totalpages"] || 0,
          currentPage: page,
        },
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Search failed",
        results: [],
        loading: false,
      });
    }
  },

  loadMore: async () => {
    const { query, pagination, loading } = get();
    if (loading || pagination.currentPage >= pagination.totalPages) return;

    await get().search(query, {
      per_page: 12,
      page: pagination.currentPage + 1,
    });
  },

  clear: () =>
    set({
      query: "",
      results: [],
      pagination: { total: 0, totalPages: 0, currentPage: 0 },
      error: null,
    }),
}));

useSearchStore.subscribe((state) => {
  console.log("🌞🌞🌞");
  console.log(state);
});

export default useSearchStore;
