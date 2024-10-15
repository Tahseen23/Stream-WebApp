import BannerHome from "../Components/BannerHome"
import { useSelector } from "react-redux"
import Card from "../Components/Card"
import HorizontalScrollCard from "../Components/HorizontalScrollCard"


import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"


const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)

  const {data:nowPlaying}=useFetch('/movie/now_playing')

  const {data:topRated}=useFetch('/movie/top_rated')

  const {data:popular}=useFetch('/movie/popular')

  

  


  return (
    <div>
      <BannerHome></BannerHome>
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}></HorizontalScrollCard>

      {/* <HorizontalScrollCard data={nowPlaying} heading={"Now Playing"} media_type={'movie'}></HorizontalScrollCard> */}

      <HorizontalScrollCard data={nowPlaying} heading={"Recommended Movies"} media_type={'movie'}></HorizontalScrollCard>

      <HorizontalScrollCard data={popular} heading={"Recommended TV"} media_type={'tv'}></HorizontalScrollCard>

      

      <HorizontalScrollCard data={topRated} heading={"Top Rated Movies"} media_type={'movie'}></HorizontalScrollCard>

      <HorizontalScrollCard data={popular} heading={"Popular TV Shows"} media_type={'tv'}></HorizontalScrollCard>


    </div>
  )
}

export default Home