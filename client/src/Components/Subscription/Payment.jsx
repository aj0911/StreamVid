import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import api from 'axios'
import Loader from '../../Helper/Loader/Loader';
import { toast } from 'react-toastify';
import { urlPrefix } from '../../Helper/Helper';
import { login, logout } from '../../Reducers/Auth';

const Payment = () => {
    const {state} = useLocation();
    const auth = useSelector(state=>state.auth);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Functions
    const handlePayment = ()=>{
        setLoading(true);
        api.post(`${urlPrefix}user/update_subscription`,{
            ...auth.user,
            subscription:state
        }).then((res)=>{
            if(res.data.status === 200){
              toast.success(res.data.message);
              dispatch(login(res.data.data));
              navigate('/');
            }
            else toast.warn(res.data.message)
          }).catch((err)=>{
            toast.warn(err.message);
          }).finally(()=>{
            setLoading(false);
          })
    }

    // Rendering
    useEffect(()=>{
        if(!auth.isAuth){
            navigate('/Auth')
        }
    },[])
  return (
    (loading)?<Loader size={100}/>:
    <div className="payment">
        <p>A Payment Gateway must be set up before any payments will be processed.</p>
        <div className="box">
            <h3>
                {
                    (auth.user?.subscription)?'Membership Level change':'New Membership Added'
                }
            </h3>
            <p>You have selected the <span>{state?.name}</span> membership level.</p>
            <div className="features">
                {
                    state?.features.map((feature,j)=>(
                        <div className="feature" key={j}>
                            <div className="dot"></div>
                            <p>{feature}</p>
                        </div>
                    ))
                }
            </div>
            <p>The price for membership is <span>{state?.amountString}</span></p>
        </div>
        <p>You are logged in as {auth.user?.email}. If you would like to use a different account for this membership, <span onClick={()=>{dispatch(logout());navigate('/Auth')}}>log out now.</span></p>
        <button onClick={handlePayment}>Submit and Check Out</button>
    </div>
  )
}

export default Payment