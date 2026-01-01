import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-burger-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🍔</span>
              <span className="text-xl font-bold text-burger-yellow">Burger Palace</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Serving the best gourmet burgers since 2010. Made with fresh ingredients and lots of love.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-burger-yellow transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-burger-yellow transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-burger-yellow transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-burger-yellow mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-burger-yellow transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-300 hover:text-burger-yellow transition-colors">
                  Order Online
                </Link>
              </li>
              <li>
                <Link to="/book-table" className="text-gray-300 hover:text-burger-yellow transition-colors">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-burger-yellow transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-burger-yellow mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-burger-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Burger Street<br />
                  Foodie City, FC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-burger-orange" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-burger-yellow transition-colors text-sm">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-burger-orange" />
                <a href="mailto:hello@burgerpalace.com" className="text-gray-300 hover:text-burger-yellow transition-colors text-sm">
                  hello@burgerpalace.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-burger-yellow mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-burger-orange" />
                <div className="text-gray-300 text-sm">
                  <p>Mon - Thu: 11:00 AM - 10:00 PM</p>
                  <p>Fri - Sat: 11:00 AM - 11:00 PM</p>
                  <p>Sunday: 12:00 PM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Burger Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
