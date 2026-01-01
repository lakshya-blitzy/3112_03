import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Calendar, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { useReservationStore } from '../store/reservationStore';

export function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  const { getUserReservations } = useReservationStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const orders = getUserOrders(user.id);
  const reservations = getUserReservations(user.id).filter(r => r.status !== 'cancelled');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-burger-orange rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-burger-orange" />
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              </div>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                        <span className="font-medium text-burger-orange">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                  <button
                    onClick={() => navigate('/order')}
                    className="mt-4 text-burger-orange hover:underline"
                  >
                    Start ordering
                  </button>
                </div>
              )}
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-burger-orange" />
                <h2 className="text-xl font-bold text-gray-800">Reservations</h2>
              </div>
              
              {reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.slice(0, 5).map((reservation) => (
                    <div key={reservation.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">
                            {new Date(reservation.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-500">at {reservation.time}</p>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                          reservation.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700'
                            : reservation.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {reservation.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Table #{reservation.tableNumber}</span>
                        <span className="mx-2">•</span>
                        <span>{reservation.partySize} guest{reservation.partySize > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reservations</p>
                  <button
                    onClick={() => navigate('/book-table')}
                    className="mt-4 text-burger-orange hover:underline"
                  >
                    Book a table
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
