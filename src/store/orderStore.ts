import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, CartItem } from '../types';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  placeOrder: (
    userId: string,
    items: CartItem[],
    orderType: 'delivery' | 'pickup',
    deliveryAddress?: string
  ) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      placeOrder: async (
        userId: string,
        items: CartItem[],
        orderType: 'delivery' | 'pickup',
        deliveryAddress?: string
      ): Promise<Order> => {
        set({ isLoading: true, error: null });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const total = items.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        );

        const newOrder: Order = {
          id: crypto.randomUUID(),
          userId,
          items,
          total,
          status: 'confirmed',
          orderType,
          deliveryAddress,
          createdAt: new Date(),
          estimatedTime: orderType === 'delivery' ? 45 : 20,
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
          currentOrder: newOrder,
          isLoading: false,
        }));

        return newOrder;
      },

      getOrderById: (orderId: string) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getUserOrders: (userId: string) => {
        return get().orders.filter((order) => order.userId === userId);
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
    }),
    {
      name: 'burger-palace-orders',
    }
  )
);
