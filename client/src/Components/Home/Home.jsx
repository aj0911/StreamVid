import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import api from 'axios'
import { toast } from 'react-toastify'
import {  FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa'
import Loader from '../../Helper/Loader/Loader'
import Title from '../../Helper/Title/Title'
import { TYPE, getMonth } from '../../Helper/Helper'
import Btns from '../../Helper/Btns/Btns'
import { useNavigate } from 'react-router-dom'
import ListView from '../../Helper/ListView/ListView';
import { MdOutlineClose } from 'react-icons/md'
import { useSelector } from 'react-redux'


const Home = ({active,setActive}) => {
    // States
    const [trendingMovies,setTrendingMovies] = useState([]);
    const [newMovies,setNewMovies] = useState([]);
    const [nowMovies,setNowMovies] = useState([]);
    const [top10Movies,setTop10Movies] = useState([]);
    const [trendingKdrama,setTrendingKdrama] = useState([]);
    const [trendingSeries,setTrendingSeries] = useState([]);
    const [upcomingMovies,setUpcomingMovies] = useState([]);
    const [persons,setPersons] = useState([]);
    const [videoState,setVideoState] = useState([]);
    const items = useRef();
    const [loading,setLoading] = useState(false);
    const [touchStartX,setTouchStartX] = useState({x:0,y:0});
    const [touchEndX,setTouchEndX] = useState({x:0,y:0});
    const navigate  = useNavigate();
    const auth = useSelector(state=>state.auth);


    // Functions
    const loadTrendingMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setTrendingMovies((prev)=>{
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
    const loadNewMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setNewMovies((prev)=>{
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
    const loadNowMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setNowMovies((prev)=>{
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
    const loadTop10Movies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setTop10Movies((prev)=>{
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
    const loadTrendingKDramas = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&with_original_language=ko`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setTrendingKdrama((prev)=>{
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
    const loadTrendingSeries = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=hi&region=IN`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setTrendingSeries((prev)=>{
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
    const loadUpcomingMovies = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=hi&region=IN`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setUpcomingMovies((prev)=>{
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
    const loadPersons = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then((data)=>{
            data.data.results.forEach((element)=>{
                api.get(`https://api.themoviedb.org/3/person/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                    setPersons((prev)=>{
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
        if(auth.isAuth===false)navigate('/Auth');
        loadTrendingMovies();
        loadNowMovies();
        loadNewMovies();
        loadTop10Movies();
        loadTrendingKDramas();
        loadTrendingSeries();
        loadUpcomingMovies();
        loadPersons();
    },[])

    useEffect(()=>{
        checkDirection();
    },[touchEndX])

  return (
    (loading)?<Loader size={100}/>:
    <div className={`home ${(active)?'active':''}`}>
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
                                <Btns item={movie}/>
                            </div>
                        </div>
                    )})
                }
            </div>
            <FaArrowLeft className='sliderPrev' onClick={slidePrev}/>
            <FaArrowRight className='sliderNext' onClick={slideNext}/>
        </div>
        <ListView title={'Trending Movies'} data={nowMovies} type={TYPE.MOVIE}/>
        <ListView title={'New Release'} data={newMovies} type={TYPE.MOVIE}/>
        <div className="TrendingMovies">
            <Title title={'Top 10 at Streamvid'} viewMore={false} type={TYPE.MOVIE}/>
            <div className="moviesList">
                {
                    (top10Movies.length>0)?
                    top10Movies.slice(0,10).map((movies,index)=>(
                        <div key={index} className="latest_movies">
                            <h3>{index+1}</h3>
                            <img style={{cursor:'pointer'}} src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" onClick={()=>{navigate(`/${(movies.seasons)?'Series':'Movies'}/${movies.id}`,{state:movies})}} />
                        </div>
                    )):''
                }
            </div>
        </div>
        <ListView title={'New K-Dramas'} data={trendingKdrama} type={TYPE.SERIES}/>
        <ListView title={'Latest Series'} data={trendingSeries} largeSize={true} type={TYPE.SERIES}/>
        <div className="upcomingMovies">
            <Title title={'Upcoming Hindi Movies'} viewMore={false} type={TYPE.MOVIE} />
            <div className="upcomingList">
                {
                    (upcomingMovies.length>=0)?
                    upcomingMovies.map((movie,index)=>(
                        <div key={index} className="upcomingMovie">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                            <div className="content">
                                <h3>{movie.title}</h3>
                                <h5>New Movie</h5>
                            </div>
                            <p>Streaming on <span>{getMonth((new Date(movie.release_date)).getMonth())} {(new Date(movie.release_date)).getDay()}, {(new Date(movie.release_date)).getFullYear()}</span></p>
                            <button onClick={()=>{setVideoState(movie);setActive(true)}}>Watch Trailer</button>
                        </div>
                    ))
                    :''
                }
            </div>
        </div>
        <div className="persons">
            <Title title={'Top Artists'} data={persons} type={TYPE.PERSON}/>
            <div className="personList">
                {
                    (persons.length>0)?
                    persons.slice(0,10).map((person,index)=>(
                        <div onClick={()=>navigate(`/Person/${person.id}`,{state:person})} key={index} className="person">
                            <img src={`https://image.tmdb.org/t/p/w500/${person.images.profiles[0].file_path}`} alt="" />
                            <h3>{person.name}</h3>
                        </div>
                    )):''
                }
            </div>
        </div>
        {
            !active?'':
            <div className={`videoContainer`}>
                <iframe className='videoPlayer' src={`https://www.youtube.com/embed/${(videoState.videos.results[0])?videoState.videos.results[0].key:''}?si=zbqzYY5FD71dS5zH`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <MdOutlineClose onClick={()=>setActive(false)} className='icon'/>
            </div>
        }
    </div>
  )
}

export default Home