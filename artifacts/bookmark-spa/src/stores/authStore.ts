import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
}

const MOCK_CREDENTIALS = {
  userId: "",
  password: "",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,

      login: (userId: string, password: string): boolean => {
        if (
          userId === MOCK_CREDENTIALS.userId &&
          password === MOCK_CREDENTIALS.password
        ) {
          set({ isAuthenticated: true, userId });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, userId: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
