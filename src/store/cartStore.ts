import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem } from '../types';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.menuItem.id === menuItem.id
          );

          let newItems: CartItem[];

          if (existingIndex >= 0) {
            newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
          } else {
            newItems = [
              ...state.items,
              { menuItem, quantity, specialInstructions },
            ];
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.menuItem.id !== itemId
          );
          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.menuItem.id === itemId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'burger-palace-cart',
    }
  )
);
