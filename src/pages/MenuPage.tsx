import { useState } from 'react';
import { MenuItemCard } from '../components/MenuItemCard';
import { menuItems } from '../data/menuItems';
import type { MenuItem } from '../types';

type Category = MenuItem['category'] | 'all';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Items' },
  { value: 'classic', label: 'Classic Burgers' },
  { value: 'specialty', label: 'Specialty Burgers' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'sides', label: 'Sides' },
  { value: 'drinks', label: 'Drinks' },
];

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-burger-brown text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted burgers, tasty sides, and refreshing drinks.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 bg-white shadow-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.value
                    ? 'bg-burger-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
