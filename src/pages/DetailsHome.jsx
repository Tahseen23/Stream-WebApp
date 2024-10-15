import { useFetcher, useParams } from "react-router-dom"
import useFetchDetails from '../hooks/useFetchDetails.js'
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import Divider from "../Components/Divider.jsx"
import useFetch from "../hooks/useFetch.js"
import HorizontalScrollCard from '../Components/HorizontalScrollCard.jsx'
import { useState } from "react"
import { setWatchLater } from "../app/store/moviesSlice.js"

const DetailsPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [name, setName] = useState('')
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`${params?.explore}/${params?.id}/credits`)
  const imageURL = useSelector(state => state.movieData.imageURL)
  const watchLater = useSelector(state => state.movieData.watchLater)
  const email=useSelector(state => state.movieData.email)
  const hrs = Math.floor(data.episode_run_time ?? data.runtime / 60)
  const min = data.episode_run_time ?? data.runtime - (60 * hrs)
  const genres = data?.genres




  const { data: similarData } = useFetch(`${params?.explore}/${params?.id}/similar`)


  const isIdPresent = watchLater.some(movie => String(movie.id) === params?.id)



  const handleWatchLater = async () => {
    const newMovie = {email:email, id: params?.id, explore: params?.explore, name: data.name || data.title, img: imageURL + data?.poster_path, ratings: data.vote_average, views: data.vote_count }
    const url='http://localhost:8080/auth/bookmark'
    const response=await fetch(url,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newMovie)
    })
    const result =await response.json()
    const {sucess,mark}=result
    if (sucess){
      dispatch(setWatchLater(mark))
    }
    
    
    // console.log(watchLater)

  }



  return (
    <div>
      <div className="w-full h-[750px] relative">
        <div className="w-full h-full" >
          <img src={imageURL + data?.backdrop_path} className="h-full w-full object-cover" />
        </div>

        <div className="absolute w-full h-full top-0  bg-gradient-to-t from-neutral-900 to-transparent"></div>

      </div>



      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">

          <img src={imageURL + data?.poster_path} className="h-100 w-60 object-cover rounded" />
        </div>

        <div>
          <h2 className="text-4xl font-bold">{data.title || data.name}</h2>
          <p className="text-neutral-400 py-1">{data?.tagline}</p>



          <div className="flex items-center gap-3">
            {
              genres?.map((gen, index) => {
                return (
                  <div className="bg-white rounded px-1 " >
                    <p className="text-black font-bold ">{gen?.name}</p>
                  </div>
                )
              })

            }


          </div>

          <Divider></Divider>
          <div className="flex items-center gap-3">
            <p>
              Ratings: {Number(data.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>View: {data.vote_count}</p>
            <span>|</span>
            <p>Duration: {hrs}hrs {min}mins</p>
          </div>

          <Divider></Divider>


          <div>
            <h3 className="text-xl font-bold text-white  ">Overview:</h3>
            <p>{data?.overview}</p>
            <Divider></Divider>

            <div className='flex items-center gap-3'>
              <p>
                Status: {data?.status}
              </p>

              <span>|</span>

              <p>
                Release Date: {moment(data?.release_date).format('MMMM Do YYYY')}
              </p>
            </div>

            <Divider></Divider>
          </div>

          <h2 className="font-bold text-lg"></h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {
              castData?.cast?.filter(el => el?.profile_path).map((startCast, index) => {
                return (
                  <div>
                    <div>
                      <img onClick={() => window.open('https://www.google.com/search?q=' + startCast?.name, '_blank')} src={imageURL + startCast.profile_path} className="w-24 h-24 object-cover rounded-full hover:scale-105 cursor-pointer" />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">{startCast?.name}</p>
                    <br />
                  </div>


                )
              })
            }
          </div>



        </div>

        {
          !isIdPresent ?
          <div className="mr-10 absolute right-10 bg-red-500 p-2 rounded hover:scale-105">
            <button onClick={handleWatchLater}>Watch Later</button>
          </div>
        :
        <div className="mr-10 absolute right-10 bg-red-300 p-2 rounded cursor-auto">
          <button>Added</button>
        </div>
        }






      </div>


      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore}></HorizontalScrollCard>
      </div>



    </div>
  )
}

export default DetailsPage