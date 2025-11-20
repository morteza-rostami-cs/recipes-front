// src/store/useUsersStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCurrentUser,
  googleAuth,
  logoutUser,
  sendOtp,
  verifyOtp,
} from "../api";

const useUsersStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      // Getters
      getUser: () => get().user,
      isAuthenticated: () => !!get().user,

      // receive otp
      getOtp: async ({ phone, email }) => {
        set({ isLoading: true, error: null });
        try {
          // 1. Verify OTP → sets JWT cookie
          const response = await sendOtp({ phone, email });
          console.log(response.data);

          set({ user: null, isLoading: false });
          return response.data;
        } catch (err) {
          const message = err.response?.data?.message || "get otp failed";
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      // Login with OTP
      login: async ({ email, phone, otp }) => {
        console.log(email, phone, otp);
        set({ isLoading: true, error: null });
        try {
          // 1. Verify OTP → sets JWT cookie
          await verifyOtp({ email, phone, otp });

          // 2. Fetch user data
          const res = await getCurrentUser();
          const userData = res.data?.user;

          set({ user: userData, isLoading: false });
          return userData;
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUser();
          set({ user: null, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      startGoogleAuth: async () => {
        set({ isLoading: true });
        try {
          await googleAuth();
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      // Optional: Load user on app start (if cookie exists)
      loadUser: async () => {
        const current = get().user;
        console.log(current);
        if (current) return current;

        set({ isLoading: true });
        try {
          const res = await getCurrentUser();
          set({ user: res.data?.user, isLoading: false });
          return res.data?.user;
        } catch (err) {
          console.error(err);
          set({ user: null, isLoading: false });
          return null;
        }
      },
    }),
    {
      name: "user-storage", // localStorage key
      partialize: (state) => ({ user: state.user }), // Only persist user
    }
  )
);

export default useUsersStore;
