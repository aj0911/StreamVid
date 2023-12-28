import React, { useEffect, useState } from 'react'
import { FaEye, FaRegPlayCircle, FaStar } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'
import { convert0Number } from '../../Helper/Helper';
import Loader from '../../Helper/Loader/Loader';

const SeriesPlayer = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [show,setShow] = useState(true);
    console.log(state);

    const handleClick = (index,seasonFile)=>{
        if(index!==state.index){
            navigate(`/Series/player/${seasonFile.id}`,{
                state:{
                    index,
                    backdrop_path:state.backdrop_path,
                    video:state.video,
                    seasonFiles:state.seasonFiles,
                    name:state.name,
                    vote_average:state.vote_average,
                    genre:state.genre
            }})
        }
        setShow(false);
        setInterval(()=>setShow(true),500)
    }
  return (
    !show?<Loader size={100}/>:
    <div id="SeriesPlayer">
        <div className="player">
            <div className="left">
                {
                    <iframe className='videoPlayer' src={`https://www.youtube.com/embed/${state.video || ''}?si=zbqzYY5FD71dS5zH`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                }
                <div className="data">
                    <h3>{state.seasonFiles[state.index].name}</h3>
                    <div className="row">
                        <h3>{state.name}</h3>
                        <h3>Season {state.seasonFiles[state.index].season_number}</h3>
                        <h3>Episode {state.seasonFiles[state.index].episode_number}</h3>
                    </div>
                    <div className="row">
                        <div className="box">
                            <FaStar className='icon'/>
                            <h3>{Math.floor(state.vote_average*10)/10}</h3>
                        </div>
                        <div className="box">
                            <FaEye className='icon'/>
                            <h3>{Math.floor(state.vote_average*Math.random()*300)} Views</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                {
                    state.seasonFiles.sort((a,b)=>{
                        return a.episode_number - b.episode_number;
                    }).map((seasonFile,index)=>{
                        if(seasonFile.runtime)
                        return(
                        <div key={index} className={`episode ${(index===state.index)?'active':''}`} onClick={()=>handleClick(index,seasonFile)}>
                            <div className="imgBox">
                                <img src={`https://image.tmdb.org/t/p/original${seasonFile.still_path || state.backdrop_path}`} />
                                {
                                seasonFile.runtime?
                                <div className="vidBox">
                                    <FaRegPlayCircle className='icon'/>
                                    <h3>{(new Date(seasonFile.runtime * 60 * 1000)).toISOString().substr(11, 8)}</h3>
                                </div>:''
                                }
                            </div>
                            <div className="content">
                                <h5>S{convert0Number(seasonFile.season_number)}E{convert0Number(seasonFile.episode_number)}</h5>
                                <h3>{seasonFile.name}</h3>
                                {
                                    window.innerWidth>999?'':
                                    <p>{seasonFile.overview}</p>
                                }
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
        
    </div>
  )
}

export default SeriesPlayer