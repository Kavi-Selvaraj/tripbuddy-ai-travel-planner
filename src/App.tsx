import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { DestinationDetail } from './pages/DestinationDetail';
import { TripPlanner } from './pages/TripPlanner';
import { BudgetCalculatorPage } from './pages/BudgetCalculatorPage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { WeatherPage } from './pages/WeatherPage';
import { GroupTripsPage } from './pages/GroupTripsPage';
import { WishlistPage } from './pages/WishlistPage';
import { GuidesPage } from './pages/GuidesPage';

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <TravelProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2923]">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/budget" element={<BudgetCalculatorPage />} />
              <Route path="/hidden-gems" element={<HiddenGemsPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/group-trips" element={<GroupTripsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </TravelProvider>
    </BrowserRouter>
  );
}
