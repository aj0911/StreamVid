import React, { useEffect } from 'react'
import './Subscribe.css'
import { subscriptions } from '../../Helper/Helper'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Subscribe = () => {
    // States
    const navigate = useNavigate();
    const auth = useSelector(state=>state.auth)
    useEffect(()=>{
        if(!auth.isAuth){
            navigate('/Auth')
        }
    },[])
  return (
    <div className="subscribe">
        <h2>Choose The Plan That Suits For You</h2>
        <p>We present 3 packages that you can choose to start watching various movies you like at low prices and according to your needs</p>
        <div className="box">
            {
                subscriptions.map((option,index)=>(
                    <div key={index} className="item">
                        <h5>{option.name}</h5>
                        <h3>{option.amountString}</h3>
                        <div className="features">
                            {
                                option.features.map((feature,j)=>(
                                    <div className="feature" key={j}>
                                        <div className="dot"></div>
                                        <p>{feature}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={()=>(auth.user.subscription?.name!==option.name)?navigate('/Payment',{state:option}):navigate('/Profile')}>{(auth.user.subscription?.name===option.name)?'Your Level':`Choose Plan`}</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Subscribe