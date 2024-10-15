import { useParams } from "react-router-dom"
import Card from "../Components/Card"

import axios from "axios"
import { useEffect, useState } from "react"

const ExplorePage = () => {
  const [pageNo, setPageNo] = useState(1)
  const params = useParams()
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  const fetchData = async () => {
    const response = await axios.get(`/discover/${params.explore}`, {
      params: {
        page: pageNo

      }
    })
    setData((prev) => {
      return [
        ...prev,
        ...response.data.results
      ]
    })

    setTotalPageNo(response.data.total_pages)

  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])


  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])





  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg font-semibold my-3">Popular {params.explore} show</h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5">
          {
            data.map((exploreData,index)=>{
              return(
                <Card data={exploreData} key={exploreData.id+'exploreSection'} media_type={params.explore} />
              )
            })
          }

          


        </div>

      </div>
    </div>
  )
}

export default ExplorePage