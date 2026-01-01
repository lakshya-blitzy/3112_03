/**
 * User type for authentication
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
}

/**
 * Menu item (burger) type
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classic' | 'specialty' | 'vegetarian' | 'sides' | 'drinks';
  isPopular?: boolean;
  ingredients: string[];
  calories: number;
}

/**
 * Cart item type
 */
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

/**
 * Order type
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  createdAt: Date;
  estimatedTime: number; // in minutes
}

/**
 * Table reservation type
 */
export interface TableReservation {
  id: string;
  userId: string;
  date: string;
  time: string;
  partySize: number;
  tableNumber?: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

/**
 * Auth state type
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Cart state type
 */
export interface CartState {
  items: CartItem[];
  total: number;
}
