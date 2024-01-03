import React, { useEffect, useRef, useState } from 'react'
import './Movies.css'
import Loader from '../../Helper/Loader/Loader';
import api from 'axios';
import { toast } from 'react-toastify';
import {  FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import ListView from '../../Helper/ListView/ListView';
import { useNavigate } from 'react-router-dom';
import {TYPE} from '../../Helper/Helper'
import { useSelector } from 'react-redux';

const Movies = () => {

  // States
  const [trendingMovies,setTrendingMovies] = useState([]);
  const [koreanMovies,setKoreanMovies] = useState([]);
  const [featuredMovies,setFeaturedMovies] = useState([]);
  const [actionMovies,setActionMovies] = useState([]);
  const [romanticMovies,setRomanticMovies] = useState([]);
  const [comedyMovies,setComedyMovies] = useState([]);
  const [blockbusterMovies,setBlockbusterMovies] = useState([]);
  const [southIndianMovies,setSouthIndianMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const items = useRef();
  const [count,setCount] = useState(0);
  const [touchStartX,setTouchStartX] = useState({x:0,y:0});
  const [touchEndX,setTouchEndX] = useState({x:0,y:0});
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);


  // functions
  const loadTrendingMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=hi`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setTrendingMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadKoreanMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=ko`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setKoreanMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadFeaturedMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setFeaturedMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadActionMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28&with_origin_country=IN`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setActionMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadRomanticMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749&with_origin_country=IN`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setRomanticMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadComedyMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setComedyMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadBlockbusterMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=revenue.desc`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setBlockbusterMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
  const loadSouthIndianMovies = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_original_language=ta`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setSouthIndianMovies((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null)return [...prev];
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
    setCount(prev=>{
      if(prev===trendingMovies.length-1)return 0;
      return prev+1;
    })
  }
  const slidePrev = ()=>{
    items.current.prepend(items.current.children[items.current.children.length-1]);
    setCount(prev=>{
      if(prev===0)return trendingMovies.length-1;
      return prev-1;
    })
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
  const nextClick = (index)=>{
    if(Math.abs(count-index)<=3)for(let i=0;i<Math.abs(count-index);i++)slideNext();
    else for(let i=0;i<Math.abs(trendingMovies.length-count+index);i++)slideNext();
  }

  // Rendering
  useEffect(()=>{
    if(auth.isAuth===false)navigate('/Auth');
    loadTrendingMovies();
    loadKoreanMovies();
    loadFeaturedMovies();
    loadActionMovies();
    loadRomanticMovies();
    loadComedyMovies();
    loadBlockbusterMovies();
    loadSouthIndianMovies();
  },[])

  useEffect(()=>{
    checkDirection();
  },[touchEndX])

  return (
    (loading)?<Loader size={100}/>:
    <div id="Movie">
      <div className="banner" >
        <div className="movieLists" ref={items}>
          {
            (trendingMovies.length>0)?
            trendingMovies.map((movie,index)=>(
              <div className="movieItem" key={index} style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${(count===index && window.innerWidth>999)?movie.backdrop_path:movie.poster_path}")`}} onTouchStart={(count===index)?touchStart:()=>{}} onTouchEnd={(count===index)?touchEnd:()=>{}} onMouseUp={(count===index)?mouseUp:()=>{}} onMouseDown={(count===index)?mouseDown:()=>{}} onClick={(count===index)?()=>{}:()=>nextClick(index)}>
                <div className="content">
                  <p>World Digital Premiere</p>
                  <h3>{movie.title}</h3>
                  <button onClick={()=>{navigate(`/Movies/${movie.id}`,{state:movie})}}>Streaming Now</button>
                </div>
              </div>
            ))
            :''
          }
        </div>
        <FaArrowLeft className='iconLeft' onClick={slidePrev}/>
        <FaArrowRight  className='iconRight' onClick={slideNext}/>
      </div>
      <ListView title={'Korean Movies'} data={koreanMovies} type={TYPE.MOVIE}/>
      <ListView title={'Featured Movies'} data={featuredMovies} type={TYPE.MOVIE}/>
      <ListView title={'Bollywood Action Movies'} data={actionMovies} type={TYPE.MOVIE}/>
      <ListView title={'Best In Bollywood Romance'} data={romanticMovies} largeSize={true} type={TYPE.MOVIE}/>
      <ListView title={'Comedy Movies'} data={comedyMovies} type={TYPE.MOVIE}/>
      <ListView title={'Blockbuster Movies'} data={blockbusterMovies} type={TYPE.MOVIE}/>
      <ListView title={'South Indian Blockbusters'} data={southIndianMovies} type={TYPE.MOVIE}/>
    </div>
  )
}

export default Movies