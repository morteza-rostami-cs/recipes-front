// stores/modalStore.js
import { create } from "zustand";

/**
 * Global modal store – only state & actions
 * No Chakra UI imports, no JSX → pure JS
 */
export const useModalStore = create((set) => ({
  isOpen: false,
  content: null,
  props: {},

  openModal: (content, props = {}) =>
    set({
      isOpen: true,
      content,
      props,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      props: {},
    }),
}));
