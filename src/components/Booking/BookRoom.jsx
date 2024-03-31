import  { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookingContext from '../../context/BookingProvider';
import { showNotification } from '../../assets/alerts/sweetAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import './BookRoom.css';
import logo from '../../assets/logo/logo.png'
import SpinLoader from '../../assets/spinner/spinner';

const AirbnbColors = {
  coral: '#FF5A5F',
  babu: '#007A87',
  babuLight: '#00A699',
  babuDark: '#005859',
  white: '#FFFFFF',
  gray: '#767676',
  grayDark: '#222222',
};

const airbnbTheme = createTheme({
  palette: {
    primary: {
      main: AirbnbColors.babu,
      light: AirbnbColors.babuLight,
      dark: AirbnbColors.babuDark,
    },
    secondary: {
      main: AirbnbColors.coral,
    },
    common: {
      white: AirbnbColors.white,
      black: AirbnbColors.grayDark,
    },
    text: {
      primary: AirbnbColors.grayDark,
    },
    background: {
      default: AirbnbColors.white,
    },
  },
});


function BookRoom() {
  const navigate = useNavigate();
  const {bookingData, setBookingData} = useContext(BookingContext) 
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setOpen(true);
  };
  
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    setIsLoading(true);
    bookApi()
  }

  const bookApi = async () => {
    try {
      const response = await axiosPrivate.post('/room/booking', bookingData);
      if(response?.data){
        setBookingData({});  
        showNotification(response?.data.status, response?.data.message)
        setIsLoading(false);
        navigate('/mybookings')
      }
    } catch (err) {
      console.error(err)
      showNotification(err?.data.data.status, err?.data.message)
    }
  }
  const ConfirmBooking = () => {
    return (
      <ThemeProvider theme={airbnbTheme}>
        <div>
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle sx={{width:'15rem', textAlign:'center'}}>Confirmation</DialogTitle>
            <DialogContent sx={{width:'15rem', textAlign:'center'}}>
              <DialogContentText>
                Confirm your Booking 
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Button  onClick={handleDialogClose}  color="primary">
                Cancel
              </Button>
              <Button onClick={handleAction} variant ="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    );
  };
  
  const formatDate = (inputDate) => {
    if(!inputDate){return 'Not Available'}
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const bookRoomTitle = () => {
    return (
      <>
        <div className='book-room-title'>
          <img style={{width:'2.8rem'}}  src={logo} alt="airbnb logo" />  
          <div>
            Request to book
          </div>
        </div>
      </>
    )
  }
  const bookRoomDetailsLeft = () => {
    return (
      <>
        <div className='br-left-1'>

          <div className='br-left-title'>
            Your Trip
          </div>

          <div className='br-left-content'>
            <div className='br-left-content-title'> Dates </div>
          <div style={{color:'var(--font-grey)'}}>{formatDate(bookingData.stayDate.startStay)} - {formatDate(bookingData.stayDate.endStay)}</div>
          </div>

          <div className='br-left-content'>
            <div className='br-left-content-title'> Guests </div>
            <div style={{color:'var(--font-grey)'}}>{bookingData.guests} Guests</div>
            </div>
        </div> 

        <div className='br-left-1'>

          <div className='br-left-title'> 
              Pay with (Credit/Debit)
            </div>

          <div className='br-left-content'>
            <div className='br-left-content-title-2'> 
                Card Number 
            </div>
            <input className='payment-input payment-width' placeholder='Demo Card Number xxxx 5678 1242 3421'></input>
          </div>

           <div className='payment-flex'>
            <div className='br-left-content payment-flex-child'>
              <div className='br-left-content-title-2'> 
                Expiration 
              </div>
              <input className='payment-input' placeholder='MM/YY'></input>
            </div>

            <div className='br-left-content payment-flex-child'>
              <div className='br-left-content-title-2'> 
                Cvv 
              </div>
              <input className='payment-input' placeholder='3 digits'></input>
            </div>
          </div> 
          <div className='br-left-content'>

            <div className='br-left-content-title-2'> 
              Card holder name
            </div>
            <input className='payment-input payment-width' placeholder='Card holder Name'></input>
          </div>
        </div> 

      </>
    )
  }


  const bookRoomDetailsRight = () => {
    return (
      <>
        <div className='br-right-content-1'>
        {bookingData.image.filePath?
        <img className='br-right-content-1-img' src={`data:${bookingData.image.mimetype};base64,${bookingData.image.data}`} alt='host profile'></img>:
        <img className='br-right-content-1-img' src={bookingData.image.data} alt='host profile'></img>

        }
          <div className='br-right-content-1-data'>
              <div style={{fontSize:'1.1rem'}}>{bookingData.description}</div>
              <div style={{fontSize:'.85rem'}}>{bookingData.title} hosted by {bookingData.host.name}</div>
              <div style={{color: 'var(--font-grey)', fontSize: '.85rem'}}>{bookingData.location.address} {bookingData.location.city}, {bookingData.location.country}</div>
          </div>
        </div>

        <div className='br-right-content-2'>
          <div className='br-right-content-2-title'>Price Details</div>
          <div className='booking-pricing-container'>
              <div className='booking-pricing-left'>&#8377;{bookingData.pricing.basePrice} x {bookingData.numberOfDays} nights</div>
              <div className='booking-pricing-right'>&#8377;{bookingData.pricing.totalPrice}</div>
          </div>
          <div className='booking-pricing-container'>
            <div className='booking-pricing-left'>Airbnb service fee</div>
            <div className='booking-pricing-right'>&#8377;{bookingData.pricing.serviceFee}</div>
          </div>
        </div>

        <div className='booking-total'>
            <div className='booking-total-left'>Total (INR)</div>
            <div className='booking-total-left'>&#8377;{bookingData.pricing.serviceFee + bookingData.pricing.totalPrice}</div>
        </div>

        <button className="booking-search-button" onClick = {handleDialogOpen} type="submit">
          Request to Reserve
        </button>
      </>
    )
  }
  




  return (
    <>
      {
        !isLoading?
        <div className='book-room-container'>
          {bookRoomTitle()}
          <div className='book-room-details'>
            <div className='book-room-details-left'>
              {bookRoomDetailsLeft()}
            </div>
            <div className='book-room-details-right'>
              {bookRoomDetailsRight()}
            </div>
          </div>
          <ConfirmBooking/>
        </div>:
        <SpinLoader/>

      }
    </>
  )
}

export default BookRoom