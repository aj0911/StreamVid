import React, { useEffect, useState } from 'react'
import './Series.css'
import ListView from '../../Helper/ListView/ListView';
import api from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../Helper/Loader/Loader';

const Series = () => {
  // States
  const [tvSeries,setTVSeries] = useState([]);
  const [hindiSeries,setHindiSeries] = useState([]);
  const [romanticKdramas,setRomanticKdramas] = useState([]);
  const [turkishDramas,setTurkishDramas] = useState([]);
  const [southIndianShows,setSouthIndianShows] = useState([]);
  const [scifiSeries,setSciFiSeries] = useState([]);
  const [sadkdramas,setSadKdramas] = useState([]);
  const [loading,setLoading] = useState(false);

  // Functions
  const loadLatestTvSeries = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
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
  const loadSadKdramas = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_origin_country=KR&with_original_language=ko&with_genres=10759`).then((data)=>{
        data.data.results.forEach((element)=>{
            api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
                setSadKdramas((prev)=>{
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

  // Rendering
  useEffect(()=>{
    loadLatestTvSeries();
    loadHindiSeries();
    loadRomanticKDramas();
    loadTurkishDramas();
    loadSouthIndianShows();
    loadSciFiSeries();
    loadSadKdramas();
  },[])
  return (
    (loading)?<Loader size={100}/>:
    <div id="Series">
      <ListView title={'Featured TV Series'} data={tvSeries}/>
      <ListView title={'Top Hindi Serials'} data={hindiSeries}/>
      <ListView title={'Romantic Kdramas'} data={romanticKdramas}/>
      <ListView title={'Popular Turkish Dramas'} data={turkishDramas} largeSize={true}/>
      <ListView title={'Best SouthIndian Shows'} data={southIndianShows} />
      <ListView title={'TV Sci-Fi and Fantasy'} data={scifiSeries} />
      <ListView title={'Kdramas for action lovers'} data={sadkdramas} />
    </div>
  )
}

export default Series