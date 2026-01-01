# Burger Palace 🍔

A modern burger restaurant website built with Vite, React, and TypeScript. Users can browse the menu, login/register, order online for delivery or pickup, and book tables for dine-in.

## Features

- 🍔 **Browse Menu** - Explore our delicious selection of burgers, sides, and drinks
- 👤 **User Authentication** - Register and login to your account
- 🛒 **Online Ordering** - Add items to cart and checkout for delivery or pickup
- 📅 **Table Booking** - Reserve a table for dine-in experience
- 📱 **Responsive Design** - Works great on desktop and mobile devices

## Tech Stack

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd burger-palace
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MenuItemCard.tsx
│   └── CartItem.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── MenuPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── CartPage.tsx
│   ├── OrderPage.tsx
│   ├── BookTablePage.tsx
│   ├── CheckoutPage.tsx
│   └── ProfilePage.tsx
├── store/              # Zustand state stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── orderStore.ts
│   └── reservationStore.ts
├── data/               # Static data
│   └── menuItems.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Features Overview

### Menu
Browse our selection of:
- Classic Burgers
- Specialty Burgers
- Vegetarian Options
- Sides
- Drinks

### Online Ordering
1. Browse the menu and add items to cart
2. Review your cart and proceed to checkout
3. Choose delivery or pickup
4. Place your order

### Table Reservations
1. Select date and time
2. Choose party size
3. Add any special requests
4. Confirm your reservation

## Development

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Zustand for state management with persistence

## Production Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## License

MIT License
