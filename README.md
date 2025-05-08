
# Crypto Price Tracker

A real-time cryptocurrency price tracking application that simulates WebSocket updates and manages state via Redux Toolkit.

![Demo GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDk4ZjRhOWQ5N2VkMTRkOWMzNjViY2I5NGIwMzQ1MmVjNjJhZGYwNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l3q2Ckc68w53RTrl4f/giphy.gif)

## Features

- 📊 Real-time cryptocurrency price updates (simulated WebSocket)
- 📈 Responsive data table with sorting functionality
- 🎨 Visual indicators for price changes (green for positive, red for negative)
- 📉 7-day mini charts for each cryptocurrency
- 💹 Price, percentage change, and volume updates every 1.5 seconds

## Tech Stack

- **React**: UI library for building the interface
- **TypeScript**: For static typing and improved developer experience
- **Redux Toolkit**: State management library for managing application state
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library built on top of Tailwind CSS
- **Vite**: Development and build tool

## Architecture

### Core Components

- **Redux Store**: Central state management with slices for cryptocurrency data
- **WebSocket Service**: Simulated WebSocket service that updates crypto prices
- **CryptoTable**: Main UI component displaying cryptocurrency data
- **Supporting Components**:
  - PercentageChange: Displays price changes with appropriate coloring
  - PriceChange: Shows price with animation on updates
  - MiniChart: Displays 7-day price chart
  - CryptoLogo: Shows cryptocurrency logos with appropriate styling

### Data Flow

1. The WebSocket service dispatches Redux actions to update cryptocurrency data
2. Redux store processes the actions and updates the application state
3. React components subscribe to the state and re-render when data changes
4. Visual indicators show price movements and updates

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd crypto-price-tracker

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`.

## Demo Walkthrough

### UI Layout

The application displays a responsive table of cryptocurrency data, including:

- Cryptocurrency name and symbol with logo
- Current price with real-time updates
- Percentage changes (1h, 24h, 7d)
- Market capitalization
- 24-hour trading volume
- Circulating supply information
- 7-day price chart

### Live Updates

- Prices update every 1.5 seconds with visual indicators
- Green highlighting for price increases
- Red highlighting for price decreases
- Auto-sorting maintains correct order during updates

### State Flow

1. The simulated WebSocket service dispatches actions to update crypto data
2. Redux processes these actions to update the application state
3. Components re-render with new data when state changes
4. UI elements animate to show data updates

### Development Process

This project was built with a focus on:
- Clean component architecture
- Efficient state management
- Responsive design
- Visual feedback for data changes
- Performance optimization for smooth updates

## Future Enhancements

- Real WebSocket integration with actual market data
- Advanced filtering options
- Detailed view for individual cryptocurrencies
- Dark/light theme switching
- User preferences saved in localStorage
- Unit testing for reducers and components
