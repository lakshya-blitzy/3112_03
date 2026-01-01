import { Link } from 'react-router-dom';
import { ChefHat, Clock, Truck, Calendar } from 'lucide-react';
import { MenuItemCard } from '../components/MenuItemCard';
import { getPopularItems } from '../data/menuItems';

export function HomePage() {
  const popularItems = getPopularItems();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burger-brown to-amber-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Best <span className="text-burger-yellow">Gourmet Burgers</span> in Town
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Handcrafted burgers made with premium ingredients. Order online for delivery or pickup, or book a table for a memorable dine-in experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/order"
                className="bg-burger-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-center transition-colors"
              >
                Order Now
              </Link>
              <Link
                to="/book-table"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-burger-brown text-white font-bold py-4 px-8 rounded-full text-center transition-colors"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
            alt="Delicious burger"
            className="w-full h-full object-cover object-left opacity-30"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-burger-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Fresh Ingredients</h3>
              <p className="text-gray-600">Premium quality meats and fresh vegetables daily</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Quick Service</h3>
              <p className="text-gray-600">Freshly made in 15 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Free delivery within 5km radius</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Easy Booking</h3>
              <p className="text-gray-600">Reserve your table in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Most <span className="text-burger-orange">Popular</span> Burgers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These crowd favorites have been winning hearts and satisfying cravings since day one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block bg-burger-brown hover:bg-amber-900 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-burger-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Burger Experience?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Whether you prefer dining in our cozy restaurant or enjoying at home, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/order"
              className="bg-white text-burger-orange hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-colors"
            >
              Order for Delivery
            </Link>
            <Link
              to="/book-table"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-burger-orange font-bold py-4 px-8 rounded-full transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
