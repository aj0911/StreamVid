import React, { useEffect, useState } from 'react'
import './PersonDetails.css'
import { useLocation, useParams } from 'react-router-dom'
import ListView from '../../Helper/ListView/ListView';
import Loader from '../../Helper/Loader/Loader';
import api from 'axios'
import {TYPE} from '../../Helper/Helper'
import { toast } from 'react-toastify';

const PersonDetails = () => {
    const [loading,setLoading] = useState(false);
    const [state,setState] = useState('');
    const {id} = useParams();

    // Functions 
    const getPerson = ()=>{
        setLoading(true);
        api.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images,credits`).then((res)=>{
            setState(res.data);
        }).catch((err)=>{
            toast.warn(err.message)
        }).finally(()=>{
            setLoading(false);
        })
    }

    // Rendering
    useEffect(()=>{
        getPerson();
    },[])
  return (
    loading?<Loader size={100}/>:
    !state?'':
    <div id="PersonDetails">
        <div className="left">
            <img src={`https://image.tmdb.org/t/p/original/${state.profile_path}`} alt="" />
            <div className="info">
                <h3>Personal Info</h3>
                {
                    [
                        {'known For':state.known_for_department},
                        {'Gender':state.gender===1?'Female':'Male'},
                        {'Birthday':state.birthday},
                        {'Place Of Birth':state.place_of_birth},
                        {'Also Known as':state.also_known_as[0]}
                    ].map((element,index)=>(
                        <div className="content" key={index}>
                            <h3>{Object.keys(element)[0]}</h3>
                            <h5>{element[Object.keys(element)[0]]}</h5>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="right">
            <h3>{state.name}</h3>
            {
                state.biography?
                <div className="bio">
                    <h3>Biography</h3>
                    <p>{state.biography}</p>
                </div>:''
            }
            {
                (state.credits)?
                state.credits.cast.length>0?
                <ListView type={TYPE.MOVIE} title={'Best Acting'} data={state.credits.cast}/>:'':''
            }
        </div>
    </div>
  )
}

export default PersonDetails