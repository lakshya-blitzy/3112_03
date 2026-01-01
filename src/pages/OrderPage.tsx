import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { MenuItemCard } from '../components/MenuItemCard';
import { menuItems } from '../data/menuItems';
import { useCartStore } from '../store/cartStore';

export function OrderPage() {
  const { getItemCount, total } = useCartStore();
  const itemCount = getItemCount();

  // Get items that are not sides or drinks
  const mainItems = menuItems.filter(
    (item) => item.category !== 'sides' && item.category !== 'drinks'
  );
  const sidesAndDrinks = menuItems.filter(
    (item) => item.category === 'sides' || item.category === 'drinks'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-burger-brown text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Order Online</h1>
          <p className="text-gray-200">
            Choose your favorites and we'll have them ready for pickup or delivery!
          </p>
        </div>
      </section>

      {/* Floating Cart Summary */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
          <Link
            to="/cart"
            className="flex items-center gap-3 bg-burger-orange text-white px-6 py-3 rounded-full shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">{itemCount} items</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </Link>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Main Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Burgers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mainItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Sides & Drinks */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sides & Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sidesAndDrinks.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      {/* Desktop Cart Summary */}
      {itemCount > 0 && (
        <div className="hidden md:block fixed bottom-8 right-8">
          <Link
            to="/cart"
            className="flex items-center gap-4 bg-burger-orange hover:bg-orange-600 text-white px-6 py-4 rounded-xl shadow-xl transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-burger-orange text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div>
              <p className="text-sm opacity-90">Your Order</p>
              <p className="font-bold text-lg">${total.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
