import React, { useEffect, useState } from 'react'
import './Search.css'
import { FaRegPlayCircle, FaSearch } from 'react-icons/fa'
import api from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Helper/Loader/Loader'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroller'

const SearchBar = () => {
    // States 
    const [data,setData] = useState([]);
    const [list,setList] = useState(data?.slice(0,8));
    const [hasMore,setHasMore] = useState(true);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    // Functions
    const loadTrendingMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((data)=>{
            data.data.results.forEach((element)=>{
                console.log(element)
                api.get(`https://api.themoviedb.org/3/${element.media_type==="movie"?`movie`:`tv`}/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setData((prev)=>{
                        if(res.data.poster_path===null)return [...prev];
                        return [...prev,res.data];
                    });
                }).catch((err)=>{
                    toast.warn(err.message)
                })
            })
        }).catch((err)=>{
            toast.warn(err.message)
        }).finally(()=>{
            setLoading(false);
        })
    }
    const loadMoreItems = (page)=>{
        if(list?.length >= data?.length )setHasMore(false);
        else setHasMore(true);
        setList(data?.slice(0,8+4*page));
    }

    // Rendering
    useEffect(()=>{
        loadTrendingMovies();
    },[])
  return (
    loading?<Loader size={100}/>:
    <div id="Search">
        <div className="bar">
            <FaSearch className='icon'/>
            <input type="text" />
        </div>
        {
            data?.length>0?
            <InfiniteScroll threshold={0} pageStart={0} loadMore={loadMoreItems} hasMore={hasMore} loader={<Loader size={50}/>} className="list">
                {
                    list?.map((item,index)=>(
                        <div  onClick={()=>navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})} key={index} className="item">
                            <img src={`https://image.tmdb.org/t/p/original${(window.innerWidth<1000?item.backdrop_path:item.poster_path) || item.profile_path}`} alt="" />
                            <div className="content">
                                <h3>{item.name || item.title}</h3>
                                <FaRegPlayCircle className='icon'  />
                            </div>
                        </div>
                    ))
                }
            </InfiniteScroll>
            :
            <Loader size={100}/>
        }
    </div>
  )
}

export default SearchBar