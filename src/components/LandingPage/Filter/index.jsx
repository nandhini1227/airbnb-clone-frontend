import  { useState } from 'react'
import PropTypes from 'prop-types';

import "./style.css"
import {links} from "../../../assets/images-links"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TuneIcon from '@mui/icons-material/Tune';


function Filter(props) {
  const [selectedFilter, setSelectedFilter] = useState("")
  const [slideIndex, setSlideIndex] = useState(0)

  
  const handleQuickSearch = (index) => {
    setSelectedFilter(index);
    props.quickSearch(links[index].label);
  }

  const slideDataLeft = () => {
    var temp =document.getElementsByClassName("quick-filter-div")[0].offsetWidth
    setSlideIndex((prev)=>{
      if(slideIndex>=1926-temp){return 0}
      else{return (prev+temp/5)}
    })
  }

  const slideDataRight = () => {
    var temp = document.getElementsByClassName("quick-filter-div")[0].offsetWidth
    setSlideIndex((prev)=>{
      if(slideIndex<=0){return 1926-temp}
      else{return (prev-temp/5)}
    })
  }

  function mapData(item,index){
      return (
      <div key={index}  style={{ transform:`translate(-${slideIndex}px)` }} className={`links-box ${index===selectedFilter && "selected-box"}`} onClick={()=>{handleQuickSearch(index)}} >
        <img src={item.imgSrc} className="links-img" alt="search"/>
        <p className='links-label'>{item.label}</p>
      </div>
      )
    }
  
  return (
      <div className='filter-div'>
        <div onClick={slideDataRight} className='filter-scroll-arrow filter-arrow-left'> <ArrowBackIosNewIcon sx={{fontSize:"1rem"}}/></div>
        <div className='quick-filter-div' >
          {links.map(mapData)}
        </div>
        <div onClick={slideDataLeft} className='filter-scroll-arrow filter-arrow-right'> <ArrowBackIosNewIcon sx={{fontSize:"1rem"}}/></div> 
         <div className='addition-filters'> 
          <p><TuneIcon sx={{fontSize:"1rem", display:"flex", alignItems:"center"}}></TuneIcon></p> 
          <p>Filters</p>
        </div> 
      </div>
  )
}
Filter.propTypes = {
  quickSearch: PropTypes.func.isRequired,
};
export default Filter;