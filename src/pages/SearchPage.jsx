import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import Card from "../Components/Card"
const SearchPage=()=>{
  const loaction=useLocation()
  const [data,setData]=useState([])

  const fetchData = async () => {
    const response = await axios.get(`/search/collection`, {
      params: {
        query:location?.search?.slice(3),
        page:1

      }
    })
    setData((prev) => {
      return [
        ...prev,
        ...response.data.results
      ]
    })


  }

  useEffect(()=>{
    fetchData()
  },[loaction?.search])

  
  return(
    <div className="py-16">
      <div className="container mx-auto">
      <h3 className="capitalize text-lg font-semibold my-3">Search Results</h3>

      <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5">
          {
            data.map((searchData,index)=>{
              return(
                <Card data={searchData} key={searchData.id+'search'} media_type={searchData.media_type} />
              )
            })
          }
        </div>



      </div>
    </div>
  )
}

export default SearchPage