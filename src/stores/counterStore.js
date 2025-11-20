import { create } from "zustand";

// define the store
export const useCounterStore = create((set) => ({
  count: 0, // state
  increment: () => set((state) => ({ count: state.count + 1 })), // action
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
