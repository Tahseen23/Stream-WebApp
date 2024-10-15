import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setWatchLater } from "../app/store/moviesSlice"

const BookMark = () => {
  const dispatch=useDispatch()
  const watchLater = useSelector(state => state.movieData.watchLater)
  const [id,setId]=useState(0)
  const email = useSelector(state => state.movieData.email)

  async function handleClick(id) {
    try {
      console.log(id);
      const deletedItem = { id: id, email: email };
      console.log(email)
      const url = 'http://localhost:8080/auth/bookmark';
  
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletedItem),
      });
  
      
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
      }
  
      const result = await response.json();
      console.log(result);
  
      const { success, mark } = result; 
        console.log(mark)
  
      
        dispatch(setWatchLater(mark));
        //  console.log(watchLater)
      
    } catch (error) {
      console.error('Error deleting bookmark:', error.message); // Log the error message
    }
  }
  
  // console.log(email)

  return (
    <div className=" items-center">
      <h3 className="capitalize text-lg font-extrabold my-3 align-middle text-center mt-20">Watch Later</h3>
      {
        watchLater?.map((data, index) => {

          return (
            <div  >

              <div className="h-80 w-[800px] bg-neutral-600 rounded mt-20 mb-5 ml-96 " >
                <div className="container flex gap-5 items-start">
                  <Link to={'/' + data.explore + '/' + data.id} className="w-72 h-80 block overflow-hidden hover:scale-105 ">

                    <img src={data.img} alt="" className="h-100 w-60 object-cover " />
                  </Link>
                  <div className="flex flex-col gap-5 mt-2">
                    <h2 className="text-4xl font-bold text-neutral-50 mt-5">{data.name}</h2>

                    <p>Ratings: {Number(data.ratings).toFixed(1)}+</p>
                    <p>Views: {data.views}</p>
                    <div>
                    <button class=" bg-red-500 p-2 rounded hover:scale-105 text-center" type="button" onClick={()=>handleClick(data.id)}>
                      Remove
                    </button>
                    </div>
                    
                  </div>

                </div>



              </div>
            </div>
          )

        })
      }
    </div>

  )

}

export default BookMark