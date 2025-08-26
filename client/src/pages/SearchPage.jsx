import React,{useState,useEffect} from 'react'
import CardProduct from '../components/CardProduct'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useLocation} from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'
const SearchPage = () => {
  const [data,setData] =useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalPage ,setTotalPage]=useState(1)
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const searchText = queryParams.get("q") || "";

    const loadingCardArray =new Array(10).fill(null)
  const fetchData=async()=>{
    try {
      setLoading(true)
      const response =await Axios({
        ...SummaryApi.searchProduct,
        data:{
          search: searchText,
          page:page
        }
      })
      const {data:responseData}=response
      if(responseData.success){
        if(responseData.page==1){
          setData(responseData.data)
        }else{
          setData((preve)=>{
            return [
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
        console.log(responseData)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData()
  },[page,searchText])

  const handleFetchMore=()=>{
    if(totalPage>page){
      setPage(preve=>preve+1 )
    }
  }




  return (
   <section className='bg-white'>
   
    <div className='container mx-auto p-4'>
      <p className='font-semibold'>
        Search results: {data.length}
      </p>
       <InfiniteScroll dataLength={data.length}
       hasMore={true}
       next={handleFetchMore}
       >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-5 py-4'>
       
{
          data.map((p,index)=>{
            return (
              <CardProduct data={p} key={p?._id+"searchProduct"+index}/>
            )
          })
        }
       
        {
          //no data 
          !data[0]  && (
            <div className='flex justify-center items-center'>
              <img
              src={noDataImage}
              
              />
              </div>
          )
        }
       {/*loading data */}
       {
        loading && (loadingCardArray.map((_,index)=>{
          return (
            <CardLoading key ={"loadingsearchpage"+index}/>
          )
        }))
       }
      </div>
       </InfiniteScroll>
    </div>
   </section>
  )
}

export default SearchPage
