import  { useContext, useEffect, useState } from 'react'
import './myBookings.css';
import SpinLoader  from '../../assets/spinner/spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import Header from '../Header/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function MyBookingCard() {

  const axiosPrivate = useAxiosPrivate();
  const {auth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataList, setDataList] = useState([]);


  useEffect ( ()=> {
    setIsLoading(true);
     fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 

  const fetchData =async () => {
    try {
      const response = await axiosPrivate.get(`/mybookings/${auth?.data?.userId}`)
      setDataList(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      navigate('/login', {state: {from: location}, replace: true})
    }
  }
  

  const formatDate = (inputDate) => {
    if(!inputDate){ return 'Not Available'}
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };



  const mapData = (item,index) =>{
    return (
      <div key={index} className='my-booking-card'>
        <div className='mbr-right-content-1'>
        {console.log(item.image)}
        {item.image.filePath?
        <img className='mbr-right-content-1-img' src={`data:${item.image.mimetype};base64,${item.image.data}`} alt='host profile'></img>:
        <img className='mbr-right-content-1-img' src={item.image.data} alt='host profile'></img>  
        }
          <div className='mbr-right-content-1-data'>
              <div style={{fontSize:'1rem'}}>{item.description}</div>
              <div style={{fontSize:'.85rem'}}>{item.title} hosted by {item.host.name}</div>
              <div style={{color: 'var(--font-grey)', fontSize: '.85rem'}}>{item.location.address} {item.location.city}, {item.location.country}</div>
              <div style={{color: 'var(--font-grey)', fontSize: '.9rem'}}>{formatDate(item.stayDate.startStay)} - {formatDate(item.stayDate.endStay)}</div>
          </div>
        </div>

        <div className='mbr-right-content-2'>
          <div className='mbr-right-content-2-title'>Price Details</div>
          <div className='my-booking-pricing-container'>
              <div className='my-booking-pricing-left'>&#8377;{item.pricing.basePrice} x {item.numberOfDays} nights</div>
              <div className='my-booking-pricing-right'>&#8377;{item.pricing.totalPrice}</div>
          </div>
          <div className='my-booking-pricing-container'>
            <div className='my-booking-pricing-left'>Airbnb service fee</div>
            <div className='my-booking-pricing-right'>&#8377;{item.pricing.serviceFee}</div>
          </div>
        </div>

        <div className='my-booking-total'>
            <div className='my-booking-total-left'>Total (INR)</div>
            <div className='my-booking-total-left'>&#8377;{item.pricing.serviceFee + item.pricing.totalPrice}</div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Header/>
      {
        !isLoading?
        <div className='my-booking-card-container'>
          <h1 className='booking-list-title' ><span style={{ color: 'var(--theme)'}}>Booking</span> List</h1>  
          <div className="my-booking">
            {dataList.length!==0 ? 
              dataList.result>0?
            dataList.data.map(mapData):"You have yet to book anything" 
            :
            <SpinLoader/>
            }
          </div>
        </div>:
        <SpinLoader/>
      }
    </>
  )
}



export default MyBookingCard;