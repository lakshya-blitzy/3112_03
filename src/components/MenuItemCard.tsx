import { Plus, Star } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addItem(item, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {item.isPopular && (
          <div className="absolute top-3 left-3 bg-burger-orange text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
        <div className="absolute top-3 right-3 bg-burger-brown/80 text-white text-xs px-2 py-1 rounded">
          {item.calories} cal
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-burger-orange">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        {/* Ingredients Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.ingredients.slice(0, 3).map((ingredient, index) => (
            <span
              key={index}
              className="text-xs bg-burger-cream text-burger-brown px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{item.ingredients.length - 3} more
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-burger-orange hover:bg-orange-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
