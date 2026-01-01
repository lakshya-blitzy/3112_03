import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Classic Burgers
  {
    id: 'classic-1',
    name: 'Classic Cheeseburger',
    description: 'Our signature beef patty with American cheese, lettuce, tomato, onion, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    category: 'classic',
    isPopular: true,
    ingredients: ['Beef Patty', 'American Cheese', 'Lettuce', 'Tomato', 'Onion', 'Special Sauce', 'Sesame Bun'],
    calories: 650,
  },
  {
    id: 'classic-2',
    name: 'Double Stack',
    description: 'Two juicy beef patties with double cheese, pickles, and mustard',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
    category: 'classic',
    isPopular: true,
    ingredients: ['2x Beef Patty', '2x American Cheese', 'Pickles', 'Mustard', 'Ketchup', 'Sesame Bun'],
    calories: 980,
  },
  {
    id: 'classic-3',
    name: 'Bacon Deluxe',
    description: 'Crispy bacon, cheddar cheese, lettuce, and our smoky BBQ sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500',
    category: 'classic',
    ingredients: ['Beef Patty', 'Crispy Bacon', 'Cheddar Cheese', 'Lettuce', 'BBQ Sauce', 'Brioche Bun'],
    calories: 780,
  },
  // Specialty Burgers
  {
    id: 'specialty-1',
    name: 'Truffle Mushroom',
    description: 'Premium beef with sautéed mushrooms, Swiss cheese, and truffle aioli',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500',
    category: 'specialty',
    isPopular: true,
    ingredients: ['Premium Beef Patty', 'Sautéed Mushrooms', 'Swiss Cheese', 'Truffle Aioli', 'Arugula', 'Brioche Bun'],
    calories: 720,
  },
  {
    id: 'specialty-2',
    name: 'Spicy Jalapeño',
    description: 'Fiery burger with jalapeños, pepper jack cheese, and chipotle mayo',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500',
    category: 'specialty',
    ingredients: ['Beef Patty', 'Fresh Jalapeños', 'Pepper Jack Cheese', 'Chipotle Mayo', 'Lettuce', 'Jalapeño Bun'],
    calories: 690,
  },
  {
    id: 'specialty-3',
    name: 'Blue Cheese & Caramelized Onion',
    description: 'Gourmet burger with crumbled blue cheese and sweet caramelized onions',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
    category: 'specialty',
    ingredients: ['Premium Beef Patty', 'Blue Cheese Crumbles', 'Caramelized Onions', 'Arugula', 'Brioche Bun'],
    calories: 750,
  },
  // Vegetarian
  {
    id: 'veg-1',
    name: 'Beyond Classic',
    description: 'Plant-based patty with all the classic toppings',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500',
    category: 'vegetarian',
    isPopular: true,
    ingredients: ['Beyond Meat Patty', 'Vegan Cheese', 'Lettuce', 'Tomato', 'Onion', 'Vegan Mayo', 'Sesame Bun'],
    calories: 580,
  },
  {
    id: 'veg-2',
    name: 'Portobello Supreme',
    description: 'Grilled portobello mushroom with goat cheese and balsamic glaze',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500',
    category: 'vegetarian',
    ingredients: ['Grilled Portobello', 'Goat Cheese', 'Roasted Red Peppers', 'Balsamic Glaze', 'Mixed Greens', 'Ciabatta'],
    calories: 420,
  },
  // Sides
  {
    id: 'side-1',
    name: 'Crispy Fries',
    description: 'Golden crispy fries with sea salt',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    category: 'sides',
    ingredients: ['Potatoes', 'Sea Salt', 'Vegetable Oil'],
    calories: 320,
  },
  {
    id: 'side-2',
    name: 'Onion Rings',
    description: 'Beer-battered onion rings with ranch dipping sauce',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500',
    category: 'sides',
    ingredients: ['Sweet Onions', 'Beer Batter', 'Ranch Sauce'],
    calories: 380,
  },
  {
    id: 'side-3',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with maple dipping sauce',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=500',
    category: 'sides',
    ingredients: ['Sweet Potatoes', 'Maple Dipping Sauce'],
    calories: 290,
  },
  {
    id: 'side-4',
    name: 'Coleslaw',
    description: 'Creamy homemade coleslaw',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1625938145312-53f9f15e79ca?w=500',
    category: 'sides',
    ingredients: ['Cabbage', 'Carrots', 'Creamy Dressing'],
    calories: 180,
  },
  // Drinks
  {
    id: 'drink-1',
    name: 'Craft Lemonade',
    description: 'Fresh-squeezed lemonade with a hint of mint',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500',
    category: 'drinks',
    ingredients: ['Fresh Lemons', 'Cane Sugar', 'Fresh Mint'],
    calories: 120,
  },
  {
    id: 'drink-2',
    name: 'Chocolate Milkshake',
    description: 'Rich and creamy chocolate milkshake',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500',
    category: 'drinks',
    isPopular: true,
    ingredients: ['Vanilla Ice Cream', 'Chocolate Syrup', 'Whole Milk', 'Whipped Cream'],
    calories: 520,
  },
  {
    id: 'drink-3',
    name: 'Soft Drinks',
    description: 'Choice of Cola, Sprite, or Fanta',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500',
    category: 'drinks',
    ingredients: ['Carbonated Water', 'Natural Flavors'],
    calories: 150,
  },
];

export const getMenuByCategory = (category: MenuItem['category']): MenuItem[] => {
  return menuItems.filter((item) => item.category === category);
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter((item) => item.isPopular);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};
