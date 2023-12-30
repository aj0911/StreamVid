import React, { useEffect,  useState } from 'react'
import './Movies.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { FaEye } from 'react-icons/fa'
import Btns from '../../Helper/Btns/Btns'
import Title from '../../Helper/Title/Title'
import { MdOutlineClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import api from 'axios'
import Loader from '../../Helper/Loader/Loader'

const MovieDetails = ({active,setActive}) => {
    const [cast,setCast] = useState('');
    const [crew,setCrew] = useState('');
    const [loading,setLoading] = useState(false);
    const [state,setState] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    // Functions 
    const getMovie = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
            setState(res.data);
            setCast(prev=>{
                res.data.credits?.cast.slice(0,5).forEach(({name},index)=>{
                    prev += name+`${(index===4)?'':', '}`;
                })
                return prev;
            })
            setCrew(prev=>{
                res.data.credits?.crew.slice(0,5).forEach(({name},index)=>{
                    prev += name+`${(index===4)?'':', '}`;
                })
                return prev;
            })
        }).catch((err)=>{
            toast.warn(err.message)
        }).finally(()=>{
            setLoading(false);
        })
    }
    // Rendering
    useEffect(()=>{
        getMovie();
    },[])
  return (
    loading && !state?<Loader size={100}/>:
    <div id="MovieDetails" className={`${active?'active':''}`}>
        <div className="banner" style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${state.backdrop_path}")`}}>
            <div className="left">
                <img src={`https://image.tmdb.org/t/p/w780${state.poster_path}`} alt="" />
            </div>
            <div className="right">
                <h3>{state.title}</h3>
                <div className="row">
                    <ReactStars count={5} value={Math.round((state.vote_average*5))/10} edit={false} color1='#FEF5E9' color2='#6C52EE' size={window.innerWidth<600?15:20} half={true}/>
                    <h3>{Math.round((state.vote_average*10))/10}</h3>
                    <div className="dot"></div>
                    <FaEye className='icon'/>
                    <h3>{Math.round(state.popularity*state.vote_average)} Views</h3>
                </div>
                <div className="row">
                    <h3>{(new Date(state.release_date)).getFullYear()}</h3>
                    <div className="dot"></div>
                    <h3>{(Math.floor(state.runtime/60)>=1)?`${Math.floor(state.runtime/60)} hr `:``}{(state.runtime%60===0)?``:`${state.runtime%60} mins `}</h3>
                </div>
                <div className="row">
                    {
                        state.genres?.map((genre,index)=>(
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
                <p>{state.overview}</p>
                <p><span>Cast: </span>{cast}</p>
                <p><span>Crew: </span>{crew}</p>
                <Btns title1='Watch Now' btn1func={()=>{setActive(true);}}/>
            </div>
        </div>
        <div className="peoples">
            <Title title={'Cast & Crew'} viewMore={false}/>
            <div className="peopleList">
                {
                    state.credits?.cast.slice(0,15).map(({name,id,character,profile_path},index)=>{
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
                    state.credits?.crew.slice(0,5).map(({name,id,job,profile_path},index)=>{
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
        {
            !active?'':
            <div className={`videoContainer`}>
                <iframe className='videoPlayer' src={`https://www.youtube.com/embed/${(state.videos.results[0])?state.videos.results[0].key:''}?si=zbqzYY5FD71dS5zH`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <MdOutlineClose onClick={()=>setActive(false)} className='icon'/>
            </div>
        }
    </div>
  )
}

export default MovieDetails