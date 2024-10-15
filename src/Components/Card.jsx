import { useSelector } from "react-redux"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Card = ({ data, trending, index,media_type }) => {
  
  const imageURL = useSelector(state => state.movieData.imageURL)
  const loggedInuser=useSelector(state=>state.movieData.loggedInuser)
  const navigate=useNavigate()
  const mediaType=data.media_type??media_type

  const handleClick=()=>{
    if (!loggedInuser){
      navigate('/login')
    }
    else{
      navigate('/' + mediaType + '/' + data.id)
    }
  }

  



  return (
    <div onClick={handleClick} className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105  transition-all cursor-pointer">
      {
        
      }
      <img src={imageURL + data?.poster_path} />

      <div className="absolute top-4">
        {
          trending && (
            <div className=" py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60"  >
              #{index} Trending
            </div>
          )
        }
      </div>
      {/* <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full  bg-black">
        <h2 className="text-ellipsis line line-clamp-1 text-lg font-semibold">{data?.title|| data?.name}</h2>

      </div> */}

    </div>
  )

}

export default Card