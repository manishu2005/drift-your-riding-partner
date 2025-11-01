import React from 'react'
import Navigation from '../components/Navigation.jsx'
import Ridepage from '../components/RidePage.jsx'
import Body from '../components/Body.jsx'
import Download from '../components/Download.jsx'


function Home() {
  return (
    <>
      
      <Ridepage/>
      <Body/>
      <Download/>
    </>
  );
}

export default Home;
