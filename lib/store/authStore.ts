import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  clearIsAuthenticated: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ isAuthenticated: false, user: null })),
}));
