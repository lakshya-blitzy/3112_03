import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useReservationStore } from '../store/reservationStore';

export function BookTablePage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { isAuthenticated, user } = useAuthStore();
  const { makeReservation, isLoading, error, getAvailableTimes, currentReservation } = useReservationStore();
  const navigate = useNavigate();

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get available times for selected date
  const availableTimes = date ? getAvailableTimes(date) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!user) return;
    
    try {
      await makeReservation(user.id, date, time, partySize, specialRequests || undefined);
      setSuccess(true);
    } catch {
      // Error is handled by the store
    }
  };

  if (success && currentReservation) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reservation Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              We've saved a table for you. See you soon!
            </p>
            
            <div className="bg-burger-cream rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">Reservation Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-burger-orange" />
                  <span>{new Date(currentReservation.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-burger-orange" />
                  <span>{currentReservation.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-burger-orange" />
                  <span>{currentReservation.partySize} {currentReservation.partySize === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Table #{currentReservation.tableNumber}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                setSuccess(false);
                setDate('');
                setTime('');
                setPartySize(2);
                setSpecialRequests('');
              }}
              className="bg-burger-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-burger-brown text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Table</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Reserve your spot for an unforgettable dining experience at Burger Palace.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {!isAuthenticated && (
                <div className="bg-burger-cream border border-burger-orange/20 rounded-lg p-4 mb-6">
                  <p className="text-gray-700">
                    Please{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-burger-orange font-medium hover:underline"
                    >
                      sign in
                    </button>{' '}
                    to make a reservation.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime(''); // Reset time when date changes
                      }}
                      min={today}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burger-orange focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burger-orange focus:border-transparent outline-none transition-all appearance-none"
                      required
                      disabled={!date}
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  {date && availableTimes.length === 0 && (
                    <p className="text-red-500 text-sm mt-2">No available times for this date.</p>
                  )}
                </div>

                {/* Party Size */}
                <div>
                  <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="partySize"
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burger-orange focus:border-transparent outline-none transition-all appearance-none"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      id="specialRequests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burger-orange focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Any dietary restrictions, celebrations, or preferences..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isAuthenticated}
                  className="w-full bg-burger-orange hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Reserving...
                    </>
                  ) : (
                    'Reserve Table'
                  )}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="mt-8 bg-burger-cream rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Reservation Policy</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Reservations are held for 15 minutes past the booking time</li>
                <li>• For parties larger than 8, please call us directly</li>
                <li>• Cancellations can be made up to 2 hours before your reservation</li>
                <li>• A valid credit card may be required for large party reservations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
