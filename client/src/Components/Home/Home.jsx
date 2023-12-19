import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import api from 'axios'
import { toast } from 'react-toastify'
import {  FaArrowLeft, FaArrowRight, FaBookmark, FaRegPlayCircle, FaStar } from 'react-icons/fa'
import Loader from '../../Helper/Loader/Loader'

const Home = () => {
    // States
    const [trendingMovies,setTrendingMovies] = useState([]);
    const items = useRef();

    // Functions
    const loadTrendingMovies = ()=>{
        api.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=images`).then((res)=>{
                    setTrendingMovies(prev=>[...prev,res.data]);
                    console.log(res.data);
                }).catch((err)=>{
                    toast.warn(err.message)
                })
            })
        }).catch((err)=>{
            toast.warn(err.message)
        }).finally(()=>{

        })
    }

    // Rendering
    useEffect(()=>{
        loadTrendingMovies()
    },[])

  return (
    <div className="home">
        <div className="hero">
            <div className="movies" ref={items}>
                {
                    (trendingMovies.length<=0)?
                    <Loader size={100}/>
                    :
                    trendingMovies.slice(0,5).map((movie,index)=>{
                        let genres = '';
                        movie.genres.forEach((e)=>{
                            genres+=e.name +', ';
                        })
                        return(
                        <div key={index} className='movieBanner' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}}>
                            <div className="content">
                                <p className='genere'>{genres.slice(0,genres.length-2)}</p>
                                <h3>{movie.original_title}</h3>
                                <div className="rating">
                                    <FaStar className='icon'/>
                                    <h3>{Math.round(movie.vote_average*10)/10}</h3>
                                    <div className="dot"></div>
                                    <h3>{(new Date(movie.release_date)).getFullYear()}</h3>
                                    <div className="dot"></div>
                                    <h3>{(Math.floor(movie.runtime/60)>=1)?`${Math.floor(movie.runtime/60)} hr `:``}{(movie.runtime%60===0)?``:`${movie.runtime%60} mins `}</h3>
                                </div>
                                <p>Enjoy exclusive Amazon Originals as well as popular movies and TV shows for USD 120z/month. Watch now, cancel anytime.</p>
                                <div className="btns">
                                    <button className='play'>
                                        <h3>Play Now</h3>
                                        <FaRegPlayCircle/>
                                    </button>
                                    <button className='watchLater'>
                                        <h3>Watch Later</h3>
                                        <FaBookmark/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )})
                }
            </div>
            <FaArrowLeft className='sliderPrev' onClick={()=>items.current.prepend(items.current.children[items.current.children.length-1])}/>
            <FaArrowRight className='sliderNext' onClick={()=>items.current.appendChild(items.current.children[0])}/>
        </div>
    </div>
  )
}

export default Home