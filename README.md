# Weather App

A modern React weather application that provides real-time weather information for any city worldwide. Features include city search with autocomplete, detailed weather data display, and a responsive design.

## Features

- 🔍 **City Search** - Search for any city with autocomplete suggestions
- 🌤️ **Current Weather** - View temperature, conditions, humidity, wind speed, and more
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Modern** - Built with React and Vite for optimal performance
- 🎯 **User-Friendly** - Intuitive interface with keyboard navigation support

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **WeatherAPI.com** - Weather data provider

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weatherApp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Get your API key from [WeatherAPI.com](https://www.weatherapi.com/)

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
weatherApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── WeatherDisplay.jsx
│   ├── layouts/             # Layout components
│   │   ├── RootLayout.jsx
│   │   └── RootLayout.css
│   ├── pages/               # Page components
│   │   └── Home.jsx
│   ├── services/            # API services
│   │   └── weatherApi.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env                     # Environment variables (git-ignored)
├── .env.example             # Example environment file
├── package.json
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_WEATHER_API_KEY` - Your WeatherAPI.com API key

## API

This project uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data:
- Current weather data
- Location search for autocomplete

## License

MIT
