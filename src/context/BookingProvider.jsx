import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const BookingContext = createContext({});

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({});

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookingContext;
