import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MobileNavigation from './Components/MobileNavigation'
import './App.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBannerData,setImageURL } from './app/store/moviesSlice'
import Login from './pages/Login'

function App() {
  const location=useLocation()
  const dispatch=useDispatch()

  const fetchTrendingData=async()=> {
    try{
      const response=await axios.get('/trending/all/day')
      dispatch(setBannerData(response.data.results))
      // console.log(response)

    }catch(err){
      console.log(err)
    }
    
  }

const fetchConfi=async()=>{
  try{
    const response=await axios.get('/configuration')
    dispatch(setImageURL(response.data.images.secure_base_url+'original'))

  }catch(err){
    console.log(err)
  }
}

  useEffect(()=>{
    fetchTrendingData(),
    fetchConfi()
  },[])

  return (
    <main className='pb-14 lg:pb-0' >
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Header />}
      <div className='min-h-[90vh]'>
        <Outlet />
        </div>
      <Footer />
      <MobileNavigation></MobileNavigation>
    </main>
  )
}

export default App
