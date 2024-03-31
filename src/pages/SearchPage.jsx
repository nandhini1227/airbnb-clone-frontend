import React from 'react'
import Header from "../components/Header/Header";
import SimpleBottomNavigation from "../components/Footer/BottomNav";
import Card from "../components/LandingPage/Card/Card";
import { useState } from "react";


function SearchPage() {
  const [searchParams, setSearchParams] = useState('');
 
  const handleSearchData = (data) => {
    setSearchParams(data);
  }


  return (
    <div>
      <Header searchParam = {handleSearchData}/>
      <Card searchParam = {searchParams}/>
      <SimpleBottomNavigation/>
    </div>
  )
}

export default SearchPage