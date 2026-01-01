import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, ShoppingBag, Loader2, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';

type OrderType = 'delivery' | 'pickup';

export function CheckoutPage() {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { placeOrder, isLoading, currentOrder } = useOrderStore();
  const navigate = useNavigate();

  const tax = total * 0.1;
  const deliveryFee = orderType === 'delivery' ? (total > 30 ? 0 : 4.99) : 0;
  const grandTotal = total + tax + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      return;
    }

    await placeOrder(user.id, items, orderType, orderType === 'delivery' ? address : undefined);
    clearCart();
    setSuccess(true);
  };

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  if (success && currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We're preparing your delicious burgers!
            </p>
            
            <div className="bg-burger-cream rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium">#{currentOrder.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type</span>
                  <span className="font-medium capitalize">{currentOrder.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time</span>
                  <span className="font-medium">{currentOrder.estimatedTime} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold text-burger-orange">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="bg-burger-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-xl border-2 transition-colors flex flex-col items-center gap-2 ${
                      orderType === 'delivery'
                        ? 'border-burger-orange bg-burger-cream'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Truck className={`w-8 h-8 ${orderType === 'delivery' ? 'text-burger-orange' : 'text-gray-400'}`} />
                    <span className="font-medium">Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-xl border-2 transition-colors flex flex-col items-center gap-2 ${
                      orderType === 'pickup'
                        ? 'border-burger-orange bg-burger-cream'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ShoppingBag className={`w-8 h-8 ${orderType === 'pickup' ? 'text-burger-orange' : 'text-gray-400'}`} />
                    <span className="font-medium">Pickup</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burger-orange focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Enter your full delivery address..."
                      required={orderType === 'delivery'}
                    />
                  </div>
                </div>
              )}

              {/* Pickup Info */}
              {orderType === 'pickup' && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Pickup Location</h2>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-burger-orange mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Burger Palace</p>
                      <p className="text-gray-600">123 Burger Street, Foodie City, FC 12345</p>
                      <p className="text-sm text-burger-orange mt-2">Ready in ~20 minutes</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.menuItem.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.quantity}x</span>
                        <span className="font-medium">{item.menuItem.name}</span>
                      </div>
                      <span className="text-gray-800">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button (Mobile) */}
              <button
                type="submit"
                disabled={isLoading}
                className="lg:hidden w-full bg-burger-orange hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - $${grandTotal.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
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
                )}
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-burger-orange">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                onClick={handleSubmit}
                disabled={isLoading}
                className="hidden lg:flex w-full bg-burger-orange hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-lg transition-colors items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
