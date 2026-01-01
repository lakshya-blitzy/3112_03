import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={item.menuItem.image}
          alt={item.menuItem.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.menuItem.name}</h3>
        <p className="text-burger-orange font-medium">${item.menuItem.price.toFixed(2)}</p>
        {item.specialInstructions && (
          <p className="text-gray-500 text-sm truncate">{item.specialInstructions}</p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <p className="font-semibold text-gray-800">
          ${(item.menuItem.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.menuItem.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
