import React, { useEffect, useState } from 'react'
import './Series.css'
import ListView from '../../Helper/ListView/ListView';
import api from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../Helper/Loader/Loader';
import Btns from '../../Helper/Btns/Btns'
import {TYPE} from '../../Helper/Helper'

const Series = () => {
  // States
  const [trendingSeries,setTrendingSeries] = useState([]);
  const [tvSeries,setTVSeries] = useState([]);
  const [hindiSeries,setHindiSeries] = useState([]);
  const [romanticKdramas,setRomanticKdramas] = useState([]);
  const [turkishDramas,setTurkishDramas] = useState([]);
  const [southIndianShows,setSouthIndianShows] = useState([]);
  const [scifiSeries,setSciFiSeries] = useState([]);
  const [actionkdramas,setActionKdramas] = useState([]);
  const [loading,setLoading] = useState(false);
  const [count,setCount]= useState(1);
  const [touchStartX,setTouchStartX] = useState({x:0,y:0});
  const [touchEndX,setTouchEndX] = useState({x:0,y:0});
  const trendingItem = 8;

  // Functions
  const loadTrendingSeries = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setTrendingSeries((prev)=>{
                    if(res.data.poster_path===null || res.data.backdrop_path === null || res.data.first_air_date === '')return [...prev];
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
  const loadLatestTvSeries = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setTVSeries((prev)=>{
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
  const loadHindiSeries = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_origin_country=IN&with_original_language=hi`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setHindiSeries((prev)=>{
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
  const loadRomanticKDramas = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749&sort_by=popularity.desc&with_original_language=ko`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setRomanticKdramas((prev)=>{
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
  const loadTurkishDramas = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&with_original_language=tr`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setTurkishDramas((prev)=>{
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
  const loadSouthIndianShows = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&with_original_language=ta`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setSouthIndianShows((prev)=>{
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
  const loadSciFiSeries = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10765,10759`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setSciFiSeries((prev)=>{
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
  const loadActionKdramas = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_origin_country=KR&with_original_language=ko&with_genres=10759`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
                setActionKdramas((prev)=>{
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
    setCount(prev=>{
      if(prev===trendingItem-1)return 0;
      return prev+1;
    })
  }
  const slidePrev = ()=>{
    setCount(prev=>{
      if(prev===0)return trendingItem-1;
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

      if(Math.abs(touchEndX.x - touchStartX.x) >=30 && Math.abs(touchEndX.y - touchStartX.y) <=50){
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
    loadTrendingSeries();
    loadLatestTvSeries();
    loadHindiSeries();
    loadRomanticKDramas();
    loadTurkishDramas();
    loadSouthIndianShows();
    loadSciFiSeries();
    loadActionKdramas();
  },[])

  useEffect(()=>{
    checkDirection();
  },[touchEndX])
  
  return (
    (loading)?<Loader size={100}/>:
    <div id="Series">
      <div className="banner">
        {
            trendingSeries.slice(0,trendingItem).map((series,index)=>(
                <div key={index} className={`serie ${(count===index)?'active':''}`} style={{'--index':index - count + 1,backgroundImage:`url("https://image.tmdb.org/t/p/original${(window.innerWidth>999)?series.backdrop_path:series.poster_path}")`}} onTouchStart={(count===index)?touchStart:()=>{}} onTouchEnd={(count===index)?touchEnd:()=>{}} onMouseUp={(count===index)?mouseUp:()=>{}} onMouseDown={(count===index)?mouseDown:()=>{}}>
                    <h3>{series.name}</h3>
                    <p>{series.overview.slice(0,250)}...</p>
                    <Btns item={series}/>
                    <div className="content">
                        <h5>{(new Date(series.first_air_date)).getFullYear()}</h5>
                        <div className="dot"></div>
                        <h5>{series.number_of_seasons} Seasons</h5>
                    </div>
                </div>
            ))
        }
        <div className="pagination">
            {
                trendingSeries.slice(0,trendingItem).map((_,index)=>(
                    <div key={index} className={`page ${count===index?'active':''}`}></div>
                ))
            }
        </div>
      </div>
      <ListView title={'Featured TV Series'} data={tvSeries} type={TYPE.SERIES}/>
      <ListView title={'Top Hindi Serials'} data={hindiSeries} type={TYPE.SERIES}/>
      <ListView title={'Romantic Kdramas'} data={romanticKdramas} type={TYPE.SERIES}/>
      <ListView title={'Popular Turkish Dramas'} data={turkishDramas} largeSize={true} type={TYPE.SERIES}/>
      <ListView title={'Best SouthIndian Shows'} data={southIndianShows} type={TYPE.SERIES} />
      <ListView title={'TV Sci-Fi and Fantasy'} data={scifiSeries} type={TYPE.SERIES} />
      <ListView title={'Kdramas for action lovers'} data={actionkdramas} type={TYPE.SERIES} />
    </div>
  )
}

export default Series