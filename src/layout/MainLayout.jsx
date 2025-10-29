import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import { Container } from '@mui/material'
import { useState } from 'react';

export default function MainLayout() {

  const [isLoggedIn,setIsLoggedIn]= useState(!!localStorage.getItem("userToken:"));
  return (
    <>
   <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
   <Container maxWidth='md'>
    <Outlet context={{setIsLoggedIn}} /> 
   </Container>
   <Footer/>
   </>
  )
}
