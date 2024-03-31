import  { useContext, useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Add prop-types import
import BookingContext from '../../context/BookingProvider';
import AuthContext from '../../context/AuthProvider';

function RoomReserve({ data }) {
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { setBookingData } = useContext(BookingContext);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const startDateFormatted = data.stayDate.startDate.split('T')[0];
  const endDateFormatted = data.stayDate.endDate.split('T')[0];
  const [startStay, setStartDay] = useState(startDateFormatted);
  const [endStay, setEndDay] = useState(endDateFormatted);

  const handleGuestIncrement = () => {
    setGuests(guests + 1);
  };

  const handleGuestDecrement = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const calculateNumberOfDays = () => {
    const start = new Date(startStay);
    const end = new Date(endStay);
    const diffDays = differenceInDays(end, start);
    setNumberOfDays(diffDays);
  };

  const handleBooking = () => {
    const bookingsData = {
      userId: auth?.data?.userId,
      roomId: data._id,
      image: data?.images[0],
      title: data.title,
      location: { ...data.location },
      description: data.description,
      numberOfDays,
      host: { name: data.host.name },
      stayDate: {
        startStay,
        endStay
      },
      pricing: {
        totalPrice: data.pricing.basePrice * numberOfDays,
        basePrice: data.pricing.basePrice,
        cleaningFee: data.pricing.cleaningFee,
        serviceFee: data.pricing.serviceFee
      },
      guests
    };
    setBookingData(bookingsData);
    navigate('/room/bookings');
  };

  useEffect(() => {
    calculateNumberOfDays();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startStay, endStay]);

  const priceRender = () => {
    return (
      <div className='room-price-row'>
        <div>
          <p><span style={{ fontSize: '1.5rem', fontWeight: '700' }}>&#8377;{data.pricing.basePrice}</span> night </p>
        </div>
        <div>
          &#9733; {data.rating}
        </div>
      </div>
    );
  };

  const reserveBooking = () => {
    return (
      <>
        <div className='reserve-form-container'>
          <div className='reserve-input'>
            <label htmlFor="checkInDate" className="reserve-input-label">Check-In</label>
            <input
              type='date'
              id="reserveCheckInDate"
              name= "checkInDate"
              className="reserve-room-input"
              value={startStay}
              onChange={(e) => setStartDay(e.target.value)}
              min={startDateFormatted}
              max={endDateFormatted}/>
          </div>
          <div className='reserve-input'>
            <label htmlFor="checkOutDate" className="reserve-input-label">Check-out</label>
            <input
              type='date'
              id="reserveCheckOutDate"
              className="reserve-room-input"
              value={endStay}
              onChange={(e) => setEndDay(e.target.value)}
              min={startDateFormatted}
              max={endDateFormatted}
            />
          </div>
        </div>
        <div className='reserve-guests'>
          <label htmlFor="guests" className="reserve-input-label">Guests</label>
          <div className="reserve-guests-input">
            <button
              className="reserve-guests-button"
              type="button"
              onClick={handleGuestDecrement}
            >
              -
            </button>
            <span className="reserve-guests-count">{guests}</span>
            <button
              className="reserve-guests-button"
              type="button"
              onClick={handleGuestIncrement}
            >
              +
            </button>
          </div>
        </div>
        <button className="reserve-search-button" onClick={handleBooking} type="submit">
          Reserve
        </button>
        <p style={{ textAlign: 'center', margin: '1rem 0' }}>You won&apos;t be charged yet</p>

      </>
    );
  };

  const pricingPerNightRender = () => {
    return (
      <>
        <div className='night-pricing-container'>
          <div className='pricing-left'>&#8377;{data.pricing.basePrice} x {numberOfDays} nights</div>
          <div className='pricing-right'>&#8377;{data.pricing.basePrice * numberOfDays}</div>
        </div>
        <div className='night-pricing-container'>
          <div className='pricing-left'>Cleaning fee</div>
          <div className='pricing-right'>&#8377;{data.pricing.cleaningFee * numberOfDays}</div>
        </div>
        <div className='night-pricing-container'>
          <div className='pricing-left'>Airbnb service fee</div>
          <div className='pricing-right'>&#8377;{data.pricing.serviceFee * numberOfDays}</div>
        </div>
      </>
    );
  };

  return (
    <div className='room-reserve-container'>
      {priceRender()}
      {reserveBooking()}
      {pricingPerNightRender()}
    </div>
  );
}

RoomReserve.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    stayDate: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired
    }).isRequired,
    pricing: PropTypes.shape({
      basePrice: PropTypes.number.isRequired,
      cleaningFee: PropTypes.number.isRequired,
      serviceFee: PropTypes.number.isRequired
    }).isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
};

export default RoomReserve;
