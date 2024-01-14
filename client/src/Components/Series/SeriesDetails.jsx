import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { FaEye, FaRegPlayCircle } from 'react-icons/fa'
import Btns from '../../Helper/Btns/Btns'
import Title from '../../Helper/Title/Title'
import '../Movies/Movies.css'
import { toast } from 'react-toastify'
import api from 'axios'
import Loader from '../../Helper/Loader/Loader'
import { TYPE, convert0Number } from '../../Helper/Helper';
import ListView from '../../Helper/ListView/ListView'


const SeriesDetails = ({active,setActive}) => {
  // States
  const {state} = useLocation();
  const [seasonFiles,setSeasonFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [seasonData,setSeasonData] = useState({
    poster_path:state.poster_path,
    vote_average:state.vote_average,
    name:state.seasons[state.seasons.length-1].name,
    overview:state.seasons[state.seasons.length-1].overview || state.overview,
    air_date:state.seasons[state.seasons.length-1].air_date,
    id:state.seasons[state.seasons.length-1].id,
    season_number:state.seasons[state.seasons.length-1].season_number
  });
  const [recommendation,setRecommendation] = useState('');

  // Functions
  const handleSelect = (value)=>{
    state.seasons.forEach(data=>{
      if(data.id==value){
        setSeasonData({
          poster_path:data.poster_path || state.poster_path,
          vote_average:data.vote_average || state.poster_path,
          name:data.name || ' ',
          overview:data.overview || state.overview,
          air_date:data.air_date || state.first_air_date,
          id:value,
          season_number:data.season_number
        })
      }
    });
  }

  const loadSeasons = ()=>{
    setLoading(true);
    setSeasonFiles([]);
    api.get(`https://api.themoviedb.org/3/tv/${state.id}/season/${seasonData.season_number}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((data)=>{
        data.data.episodes.forEach(element=>{
          api.get(`https://api.themoviedb.org/3/tv/${state.id}/season/${seasonData.season_number}/episode/${element.episode_number}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images`).then((res)=>{
            setSeasonFiles((prev)=>{
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

  const getRecommendation = ()=>{
    setLoading(true);
    api.get(`https://api.themoviedb.org/3/tv/${state.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`).then((data)=>{
      data.data.results.forEach((element)=>{
        api.get(`https://api.themoviedb.org/3/tv/${element.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
            setRecommendation((prev)=>{
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
  
  // Rendering
  useEffect(()=>{
    loadSeasons();
    getRecommendation();
  },[seasonData])

  useEffect(()=>{
    setSeasonData({
      poster_path:state.poster_path,
      vote_average:state.vote_average,
      name:state.seasons[state.seasons.length-1].name,
      overview:state.seasons[state.seasons.length-1].overview || state.overview,
      air_date:state.seasons[state.seasons.length-1].air_date,
      id:state.seasons[state.seasons.length-1].id,
      season_number:state.seasons[state.seasons.length-1].season_number
    });
    getRecommendation();
    document.querySelector('#MovieDetails .banner').scrollIntoView();
  },[state])

  return (
    <div id="MovieDetails" className={`SeriesDetails ${active?'active':''}`}>
        <div className="banner" style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${state.backdrop_path}")`}}>
            <div className="left">
                <img src={`https://image.tmdb.org/t/p/w780${seasonData.poster_path}`} />
            </div>
            <div className="right">
                <div className="row">
                    {
                        state.genres.map((genre,index)=>(
                            <>
                                <h3>{genre.name}</h3>
                                {
                                    (index===state.genres.length-1)?'':
                                    <div className="dot"></div>
                                }
                            </>
                        ))
                    }
                </div>
                <h3>{state.name}<span>: {seasonData.name}</span></h3>
                <div className="row">
                    <ReactStars count={5} value={Math.round((seasonData.vote_average*5))/10} edit={false} color1='#FEF5E9' color2='#6C52EE' size={window.innerWidth<600?15:20} half={true}/>
                    <h3>{Math.round(((seasonData.vote_average*10))/10) || 0 }</h3>
                    <div className="dot"></div>
                    <FaEye className='icon'/>
                    <h3>{Math.round(state.popularity*seasonData.vote_average)} Views</h3>
                </div>
                <div className="row">
                    <h3>{(new Date(seasonData.air_date)).getFullYear()}</h3>
                    <div className="dot"></div>
                    <h3>{state.number_of_seasons} Seasons</h3>
                </div>
                <p>{seasonData.overview }</p>
                <Btns item={state} title1='Start Watching' btn1func={()=>navigate(`/Series/player/${seasonFiles[0].id}`,{state:{index:0,backdrop_path:state.backdrop_path,video:state.videos.results[0]?.key,seasonFiles,name:state.name,vote_average:state.vote_average,genre:state.genre}})}/>
                <select value={seasonData.id} onChange={(e)=>handleSelect(e.target.value)}>
                  {
                    state.seasons.map((season,index)=>(
                      
                      <option className='option' key={index} value={season.id}>{season.name}</option>
                    ))
                  }
                </select>
            </div>
        </div>
        {
          loading?<Loader size={100}/>:
          <div  className="episodes">
            {
              (seasonFiles.length>0)?
              seasonFiles.sort((a,b)=>{
                return a.episode_number - b.episode_number;
              }).map((seasonFile,index)=>(
                <div key={index} className="episode" onClick={()=>{if(seasonFile.runtime)navigate(`/Series/player/${seasonFile.id}`,{state:{index,backdrop_path:state.backdrop_path,video:(state.videos.results[0])?.key,seasonFiles,name:state.name,vote_average:state.vote_average,genre:state.genre}})}}>
                  <div className="top">
                    <img src={`https://image.tmdb.org/t/p/original${seasonFile.still_path || state.backdrop_path}`} />
                    {
                      seasonFile.runtime?
                      <div className="vidBox">
                        <FaRegPlayCircle className='icon'/>
                        <h3>{(new Date(seasonFile.runtime * 60 * 1000)).toISOString().substr(11, 8)}</h3>
                      </div>:''
                    }
                  </div>
                  <div className="bottom">
                    <h3>S{convert0Number(seasonData.season_number)}E{convert0Number(seasonFile.episode_number)}</h3>
                    <h2>{seasonFile.name}</h2>
                    <p>{seasonFile.overview}</p>
                  </div>
                </div>
              ))
              :''
            }
          </div>
        }
        
        <div className="peoples">
            <Title title={'Cast & Crew'} viewMore={false}/>
            <div className="peopleList">
                {
                    state.credits.cast.map(({name,id,character,profile_path},index)=>{
                        if(profile_path===null)return;
                        return(
                        <div onClick={()=>navigate(`/Person/${id}`)} className="people" key={index}>
                            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="" />
                            <div className="content">
                                <h3>{name}</h3>
                                <h5>{character}</h5>
                            </div>
                        </div>
                    )})
                }
                {
                    state.credits.crew.map(({name,job,profile_path,id},index)=>{
                        if(profile_path===null)return;
                        return(
                        <div onClick={()=>navigate(`/Person/${id}`)} className="people" key={index}>
                            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="" />
                            <div className="content">
                                <h3>{name}</h3>
                                <h5>{job}</h5>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
        
        <ListView title={'More Like This'} data={recommendation} type={TYPE.SERIES}/>
    </div>
  )
}

export default SeriesDetails