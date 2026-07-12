import { create } from "zustand";

const useStore = create((set) => ({
  activeSection: "home",
  setActiveSection: (section) => set({ activeSection: section }),

  scrollDirection: "up",
  setScrollDirection: (dir) => set({ scrollDirection: dir }),

  isNavVisible: true,
  setNavVisible: (visible) => set({ isNavVisible: visible }),

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  mousePosition: { x: 0, y: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),
}));

export default useStore;
