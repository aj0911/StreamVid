import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import api from 'axios'
import { toast } from 'react-toastify'
import {  FaArrowLeft, FaArrowRight, FaBookmark, FaRegPlayCircle, FaStar } from 'react-icons/fa'
import Loader from '../../Helper/Loader/Loader'
import Title from '../../Helper/Title/Title'

const Home = () => {
    // States
    const [trendingMovies,setTrendingMovies] = useState([]);
    const [newMovies,setNewMovies] = useState([]);
    const [nowMovies,setNowMovies] = useState([]);
    const [top10Movies,setTop10Movies] = useState([]);
    const [trendingKdrama,setTrendingKdrama] = useState([]);
    const [trendingSeries,setTrendingSeries] = useState([]);
    const items = useRef();
    const [loading,setLoading] = useState(false);
    const [touchStartX,setTouchStartX] = useState({x:0,y:0});
    const [touchEndX,setTouchEndX] = useState({x:0,y:0});

    // Functions
    const loadTrendingMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setTrendingMovies(prev=>[...prev,res.data]);
                    console.log(res.data);
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
    const loadNewMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setNewMovies(prev=>[...prev,res.data]);
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
    const loadNowMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setNowMovies(prev=>[...prev,res.data]);
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
    const loadTop10Movies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setTop10Movies(prev=>[...prev,res.data]);
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
    const loadTrendingKDramas = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&with_original_language=ko`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setTrendingKdrama(prev=>[...prev,res.data]);
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
    const loadTrendingSeries = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=hi&region=IN`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                    setTrendingSeries(prev=>[...prev,res.data]);
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
    const slideNext = ()=>{
        items.current.appendChild(items.current.children[0]);
    }
    const slidePrev = ()=>{
        items.current.prepend(items.current.children[items.current.children.length-1]);
    }
    const touchStart = (e)=>{
        setTouchStartX({x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY});
    }
    const touchEnd = (e)=>{
        setTouchEndX({x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY});
    }

    const checkDirection = ()=>{

        if(Math.abs(touchEndX.x - touchStartX.x) >=50 && Math.abs(touchEndX.y - touchStartX.y) <=50){
            if(touchEndX.x < touchStartX.x)slideNext();
            if(touchEndX.x > touchStartX.x)slidePrev();
        }
    }

    const mouseUp = (e)=>{
        setTouchEndX({x:e.clientX,y:e.clientY})
    }
    const mouseDown = (e)=>{
        setTouchStartX({x:e.clientX,y:e.clientY});
    }
    // Rendering
    useEffect(()=>{
        loadTrendingMovies();
        loadNowMovies();
        loadNewMovies();
        loadTop10Movies();
        loadTrendingKDramas();
        loadTrendingSeries();
    },[])

    useEffect(()=>{
        checkDirection();
    },[touchEndX])

  return (
    (loading)?<Loader size={100}/>:
    <div className="home">
        <div className="hero">
            <div className="movies" ref={items}>
                {
                    (trendingMovies.length<=0)?
                    ''
                    :
                    trendingMovies.map((movie,index)=>{
                        let genres = '';
                        movie.genres.forEach((e)=>{
                            genres+=e.name +', ';
                        })
                        return(
                        <div key={index} className='movieBanner' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${(window.innerWidth>999)?movie.backdrop_path:movie.poster_path}")`}} onTouchStart={(e)=>touchStart(e)} onTouchEnd={(e)=>touchEnd(e)} onMouseDown={(e)=>mouseDown(e)} onMouseUp={(e)=>{mouseUp(e)}}>
                            <div className="content">
                                <p className='genere'>{genres.slice(0,genres.length-2)}</p>
                                <h3>{movie.title}</h3>
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
                                    <button className='play' onClick={()=>console.log('clicked')}>
                                        <h3>Play Now</h3>
                                        <FaRegPlayCircle/>
                                    </button>
                                    <button className='watchLater' onClick={()=>console.log('clicked')}>
                                        <h3>Watch Later</h3>
                                        <FaBookmark/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )})
                }
            </div>
            <FaArrowLeft className='sliderPrev' onClick={slidePrev}/>
            <FaArrowRight className='sliderNext' onClick={slideNext}/>
        </div>
        <div className="TrendingMovies">
            <Title title={'Trending Movies'}/>
            <div className="moviesList">
                {
                    (nowMovies.length>0)?
                    nowMovies.slice(0,10).map((movies,index)=>(
                        <div key={index} className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                            <FaRegPlayCircle className='icon'/>
                            <button>Add to My List</button>
                        </div>
                    )):''
                }
            </div>
        </div>
        <div className="TrendingMovies">
            <Title title={'New Release'}/>
            <div className="moviesList">
                {
                    (newMovies.length>0)?
                    newMovies.slice(0,10).map((movies,index)=>(
                        <div key={index} className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                            <FaRegPlayCircle className='icon'/>
                            <button>Add to My List</button>
                        </div>
                    )):''
                }
            </div>
        </div>
        <div className="TrendingMovies">
            <Title title={'Top 10 at Streamvid'} viewMore={false}/>
            <div className="moviesList">
                {
                    (top10Movies.length>0)?
                    top10Movies.slice(0,10).map((movies,index)=>(
                        <div key={index} className="latest_movies">
                            <h3>{index+1}</h3>
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                        </div>
                    )):''
                }
            </div>
        </div>
        <div className="TrendingMovies">
            <Title title={'New K-Dramas'}/>
            <div className="moviesList">
                {
                    (trendingKdrama.length>0)?
                    trendingKdrama.slice(0,10).map((movies,index)=>(
                        <div key={index} className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                            <FaRegPlayCircle className='icon'/>
                            <button>Add to My List</button>
                        </div>
                    )):''
                }
            </div>
        </div>
        <div className="TrendingMovies">
            <Title title={'Latest Series'}/>
            <div className="moviesList">
                {
                    (trendingSeries.length>0)?
                    trendingSeries.slice(0,10).map((movies,index)=>(
                        <div key={index} className="movie largeSeries">
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                            <FaRegPlayCircle className='icon'/>
                            <button>Add to My List</button>
                        </div>
                    )):''
                }
            </div>
        </div>
    </div>
  )
}

export default Home