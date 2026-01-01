import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { CartItem } from '../components/CartItem';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export function CartPage() {
  const { items, total, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any delicious burgers yet!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-burger-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tax = total * 0.1; // 10% tax
  const deliveryFee = total > 30 ? 0 : 4.99;
  const grandTotal = total + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.menuItem.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {total < 30 && (
                  <p className="text-sm text-gray-500">
                    Add ${(30 - total).toFixed(2)} more for free delivery!
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-burger-orange">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-burger-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 mt-4 text-gray-600 hover:text-burger-orange transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
