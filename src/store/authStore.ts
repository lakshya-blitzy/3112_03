import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Simulated user database (in production, this would be an API call)
const users: Map<string, { user: User; password: string }> = new Map();

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const userData = users.get(email);
        
        if (!userData) {
          set({ isLoading: false, error: 'User not found. Please register first.' });
          return false;
        }
        
        if (userData.password !== password) {
          set({ isLoading: false, error: 'Invalid password.' });
          return false;
        }
        
        set({
          user: userData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      },

      register: async (name: string, email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (users.has(email)) {
          set({ isLoading: false, error: 'Email already registered.' });
          return false;
        }
        
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name,
          createdAt: new Date(),
        };
        
        users.set(email, { user: newUser, password });
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'burger-palace-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
