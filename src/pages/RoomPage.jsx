import { useEffect, useState } from 'react';
import Header from '../components/Header/Header'
import Room from '../components/RoomPage/RoomDescription';
import RoomImgContainer from '../components/RoomPage/RoomImgContainer';
import RoomSummary from '../components/RoomPage/RoomSummary';
import SpinLoader  from '../assets/spinner/spinner';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SimpleBottomNavigation from '../components/Footer/BottomNav';

function RoomPage() {
  const { id } = useParams();
  const axiosPrivates = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [individualRoomData, setIndividualRoomData] = useState({});
  const isObjectWithData = individualRoomData && Object.keys(individualRoomData).length !== 0;
  
  useEffect( ()=> {
    async function fetchData() {
      try{
        const response = await axiosPrivates.get(`/${id}`,{
          withCredentials:true
        })
        setIndividualRoomData(response.data.data)
      } catch (err) {
        console.error(err);
        navigate('/login', {state: {from: location}, replace: true})
      }     
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  return (
    <>
      <Header/>
        {isObjectWithData ? (
          <>
            <Room data = {individualRoomData} />
            <RoomImgContainer  data = {individualRoomData}/>
            <RoomSummary data = {individualRoomData} />
          </>
        ) : (
          <SpinLoader />
        )}
      <SimpleBottomNavigation/>
    </>
  )
}

export default RoomPage