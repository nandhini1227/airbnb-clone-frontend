
import LandingPage from './pages/LandingPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';
import BookingProvider from './context/BookingProvider';
import HostPage from './pages/HostPage';
import BecomeHostProvider from './context/BecomeHostProvider';
import ManagePage from './pages/ManagePage';
import BookingPage from './pages/BookingPage';
import ListingCardPage from './pages/ListingCardPage';
import MyBookingPage from './pages/MyBookingPage';
import SearchDataProvider from './context/SearchDataProvider';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <BecomeHostProvider>
          <SearchDataProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/room/:id" element={<RoomPage />} />
              <Route path="/room/bookings" element={<BookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/becomehost" element={<HostPage />} />
              <Route path="/manage/:id" element={<ManagePage />} />
              <Route path="/dashboard" element={<ListingCardPage />} />
              <Route path="/mybookings" element={<MyBookingPage />} />
            </Routes>
          </SearchDataProvider>
        </BecomeHostProvider>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
