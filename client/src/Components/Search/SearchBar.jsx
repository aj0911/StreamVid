import React, { useEffect, useState } from 'react'
import './Search.css'
import { FaRegPlayCircle, FaSearch } from 'react-icons/fa'
import api from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Helper/Loader/Loader'
import { toast } from 'react-toastify'

const SearchBar = () => {
    // States 
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
    const [totalPages,setTotalPages] = useState(0);
    // Functions
    const loadTrendingMovies = ()=>{
        setData([]);
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits&page=${page}`).then((data)=>{
            setTotalPages(data.data.total_pages);
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/${element.media_type==="movie"?`movie`:`tv`}/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setData((prev)=>{
                        if(res.data.poster_path===null || res.data.backdrop_path===null)return [...prev];
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
    const searchItems = ()=>{
        setData([]);
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&append_to_response=videos,images,credits&page=${page}`).then((data)=>{
            setTotalPages(data.data.total_pages);
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setData((prev)=>{
                        if(res.data.poster_path===null || res.data.backdrop_path===null)return [...prev];
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

    // Rendering
    useEffect(()=>{
        if(query==='')
        loadTrendingMovies();
        else searchItems();
    },[page,query])
  return (
    <div id="Search">
        <div className="bar">
            <FaSearch className='icon'/>
            <input placeholder='Search Movies, TV Shows...' onChange={e=>{setQuery(e.target.value);setPage(1)}} type="text" />
        </div>
        <h3>Recommended TV Shows and Movies</h3>
        {
            data?.length>0 && !loading?
            <div className="list">
                {
                    data?.map((item,index)=>(
                        <div  onClick={()=>navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})} key={index} className="item">
                            <img src={`https://image.tmdb.org/t/p/w780${(window.innerWidth<1000?item.backdrop_path:item.poster_path) || item.profile_path}`} alt="" />
                            <div className="content">
                                <h3>{item.name || item.title}</h3>
                                <FaRegPlayCircle className='icon'  />
                            </div>
                        </div>
                    ))
                }
            </div>
            :
            <Loader size={100}/>
        }
        <div className="pagination">
            <button style={{visibility:page<=1?'hidden':'initial'}} onClick={()=>setPage(page-1)}>{'<'}</button>
            <h3>{page}</h3>
            <button style={{visibility:page>=totalPages?'hidden':'initial'}} onClick={()=>setPage(page+1)}>{'>'}</button>
        </div>
    </div>
  )
}

export default SearchBar