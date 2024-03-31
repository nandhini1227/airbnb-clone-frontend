import  { useContext, useEffect, useState } from 'react'
import './dashboard.css';
import SpinLoader  from '../../assets/spinner/spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import Header from '../Header/Header';
import { showNotification } from '../../assets/alerts/sweetAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ListingDashboardSlider from '../../assets/Slider/ListingDashboardSlider';

function ListingCard() {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);

  useEffect (()=> {
    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  const fetchData =async () => {
    try {
      const response = await axiosPrivate.get(`/?userId=${auth?.data?.userId}`)
      setDataList(response.data);
    } catch (err) {
      console.error(err);
      navigate('/login', {state: {from: location}, replace: true})
    }
  }

  const handleRoomId = (items) => {
    navigate(`/manage/${items._id}`);
  }
 
  const handleDeleteHosted = async (items) => {
    setIsLoading(true)
    await deleteHosted(items._id)
    await fetchData()
    setIsLoading(false);
  }
  const deleteHosted = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/${id}`);
      if(response.status===204){
        showNotification('success', "Deleted")
      }
    } catch (err)  {
      showNotification('error', "Please Try again" )
    }
  }

 
  
  const formatDate = (inputDate) => {
    if(!inputDate){
      return 'Not Available'
    }
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };


  const handleCreateNewHost = () => {
    navigate('/becomehost');
  }

 

  const mapData = (items,index) =>{
    return (
      <div key ={index} className="section_cards">
        <div className='section-card-img-container'>
        <ListingDashboardSlider> 
            {items.images.map((item, index) => {
              return (
                <div style={{background:"red"}} key={index} className="section_card_img"  >
                {item.filePath?
                  <img src={`data:${item.mimetype};base64,${item.data}`} alt="section_card_img"/>:
                  <img src={item.data} alt = "card_img"/> 
                }
                </div>  
              ) 
            })}
        </ListingDashboardSlider>      
        
        </div>
        <div className="section_card_content">
          <div id="section_card_content_1">
            <div>{`${items.location.city}, ${items.location.country}`}</div>
            <div>&#9733; {items.rating}</div>
          </div>
          <div id="section_card_content_2">
            <div>{items.title}</div>
            <div>{`${formatDate(items.stayDate.startDate)}`} - {`${formatDate(items.stayDate.endDate)}`}</div>
          </div>
          <div id="section_card_content_3">
            <p>&#8377; {items.pricing.basePrice} Night</p>
            <div className='manage-button-flex'>
              <button className='manage-edit-button' type='submit' onClick = {()=> handleRoomId( items)}>Edit</button>
              <button className='manage-delete-button' type='submit' onClick = {()=> handleDeleteHosted(items)}>Delete</button>
            </div>
          </div>
        </div>
        
      </div>
  
    )
  }


  return (
    <>
      <Header/>
      <div className='listing-card-container'>
        <div className='hosting-listing-title-container'>
        <h1 className='hosting-listing-title'><span style={{ color: 'var(--theme)'}}>Hosted</span> Listing</h1>
        <div className='dashboard-host-profile' >
          <button className='manage-delete-button' style={{padding:'.2rem', fontSize:'.8rem', width:'10rem'}} type='submit' onClick={handleCreateNewHost}> Host new Home</button>
        { dataList.result>0? 
          dataList.data[0].host.profile.filePath?
          <img src={`data:image/jpeg;base64,${dataList.data[0].host.profile.data}`} alt='host'></img>:
          <img src={dataList.data[0].host.profile.data} alt='host'></img>
        :null}
      </div>
        </div>
        {!isLoading?   
        <div className="section_container">
          {dataList.length!==0 ? 
            dataList.result>0?
          dataList.data.map(mapData):"You are not a host Yet" 
          :
          <SpinLoader/>
          }
        </div>: <SpinLoader/>
        }
      </div>
    </>
  )
}



export default ListingCard;