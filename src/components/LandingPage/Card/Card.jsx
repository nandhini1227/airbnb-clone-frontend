import  { useContext, useEffect, useState } from 'react';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import "./style.css"
import SpinLoader  from '../../../assets/spinner/spinner';
import Filter from "../Filter";
import { useNavigate } from 'react-router-dom';
import CardSlider from '../../../assets/Slider/CardSlider';
import { axiosNormal } from '../../../Axios/axios';
import { SearchDataContext } from '../../../context/SearchDataProvider';

function Card() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const {searchData, setSearchData} = useContext(SearchDataContext);
  const [quickSearch, setQuickSearch] = useState('');
  const [dataList, setDataList] = useState([]);

  const handleQuickSearch = (data) => {
    setDataList([]);
    setQuickSearch(data);
  }

  useEffect(()=> {
    setIsLoading(true);
    if(quickSearch){fetchDataByFilter(quickSearch)}
    else if (searchData){fetchDataBySearchParam(searchData);}
    else {
      fetchData();
    }
    setSearchData('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[quickSearch, searchData])


  const fetchData = async () => {
    try {
      const response = await axiosNormal.get('/');
      setDataList(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  const fetchDataByFilter = async (quickSearch) => {
    try {
      const response = await axiosNormal.get(`/?title=${quickSearch}`);
      setDataList(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  const fetchDataBySearchParam = async (data) => {
    try {
      const {location, checkInDate, checkOutDate, guests } = data;
      const response = await axiosNormal.get(`/search/?country=${location}&startDate=${checkInDate}&endDate=${checkOutDate}&guestCapacity=${guests}`);
      setDataList(response.data);
        setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  const handleRoomId = (items) => {
    navigate(`/room/${items._id}`);
  }

  const formatDate = (inputDate) => {
    if(!inputDate){return 'Not Available'}
    const date = new Date(inputDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const mapData = (items,index) =>{
    return (
      <div key ={index} className="section_cards" onClick = {()=> handleRoomId( items)}>
        <div className='section-card-img-container'>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteTwoToneIcon sx={{zIndex:'10', position:"absolute", right:"5%", top:"5%"}} className='card-like-icon'/>       
        </div>
            <CardSlider>
            {items.images.map((item, index) => {
              return (
                <div key={index} className="section_card_img"  >
                {item.filePath?
                  <img src={`data:${item.mimetype};base64,${item.data}`} alt="section_card_img"/>:
                  <img src={item.data} alt = "card_img"/> 
                }
                </div>  
              ) 
            })}
        </CardSlider>      
        
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
          </div>
        </div>
        
      </div>
  
    )
  }

  return (
    <>
      <Filter quickSearch = {handleQuickSearch}/>
      {!isLoading?
      <div className="section_container">
        {dataList.length!==0 ? 
          dataList.result>0?
        dataList.data.map(mapData):"No Result found" 
        :<SpinLoader/>}
      </div>: <SpinLoader/>
      }
    </>
  )
}

export default Card;
