# Designer Me - Online Store

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse products with filtering and sorting
- 🛒 **Shopping Cart**: Add, remove, and manage cart items
- 💳 **Checkout Process**: Complete checkout with shipping and payment forms
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful design with smooth animations
- ⚡ **Fast Performance**: Optimized for speed and user experience

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd designer-me
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── context/            # React context providers
│   └── CartContext.tsx # Shopping cart state management
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Products.tsx    # Product catalog
│   ├── ProductDetail.tsx # Individual product page
│   ├── Cart.tsx        # Shopping cart
│   └── Checkout.tsx    # Checkout process
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Featured products showcase
- Company benefits and features
- Responsive design for all devices

### Products Page
- Product grid and list views
- Category filtering
- Price and name sorting
- Search functionality
- Add to cart functionality

### Product Detail Page
- Product images and information
- Quantity selection
- Add to cart and wishlist
- Related products
- Product features and specifications

### Shopping Cart
- Cart item management
- Quantity adjustment
- Remove items
- Order summary with tax calculation
- Proceed to checkout

### Checkout Process
- Shipping information form
- Payment information form
- Order summary
- Order confirmation

## Styling

The app uses Tailwind CSS for styling with a custom color scheme:
- Primary colors: Blue gradient (#0ea5e9 to #075985)
- Background: Light gray (#f9fafb)
- Cards: White with subtle shadows
- Text: Various gray shades for hierarchy

## State Management

The app uses React Context API for state management:
- `CartContext`: Manages shopping cart state
- Cart items, quantities, and totals
- Add, remove, and update cart functionality

## Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

To build the app for production:

```bash
npm run build
```

The build folder will contain the production-ready files that can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 