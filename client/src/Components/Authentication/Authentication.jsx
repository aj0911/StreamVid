import React, { useEffect, useState } from 'react'
import './Auth.css'
import { authItems } from '../../Helper/Helper'
import api from 'axios'
import Loader from '../../Helper/Loader/Loader'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {login, logout} from '../../Reducers/Auth'

const Authentication = ({setActive}) => {
  // States
  const [item,setItem] = useState(authItems.ENTRY);
  const [data,setData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const [laading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth)

  // Functions
  const handleSignIn = (e)=>{
    e.preventDefault();
    setLoading(true)
    api.post(`user/login`,{
      email:data.email,
      password:data.password
    }).then((res)=>{
      if(res.data.status === 200){
        toast.success(res.data.message);
        console.log(res.data);
        dispatch(login(res.data.data));
        setActive(false);
        navigate('/');
      }
      else toast.warn(res.data.message);
    }).catch((err)=>{
      toast.warn(err.message);
    }).finally(()=>{
      setLoading(false);
    })
  }
  const handleSignUp = (e)=>{
    e.preventDefault();
    setLoading(true)
    api.post(`user/register`,{
      name:data.name,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    }).then((res)=>{
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch(login(res.data.data));
        setActive(false);
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
    if(auth.isAuth){
      setActive(false);
      navigate('/');
    }
    setActive(true)
  },[])

  return (
    laading?<Loader size={100}/>:
    <div className="auth">
      {
        (item === authItems.ENTRY)?
        <div className="authBox">
          <div className="logo">
            <img src={require('../../Assets/logo-bgRemove.png')} alt="" />
            <h1>Streamvid</h1>
          </div>
          <h3>Stream at your comfort at any time for free</h3>
          <p>Stream unlimited Movies and Tv Shows on your Phon, Tablet, Laptop and Tv</p>
          <div className="box">
            <button onClick={()=>{setItem(authItems.SIGNIN);setData({})}}>Sign In</button>
            <button onClick={()=>{setItem(authItems.SIGNUP);setData({})}}>Sign Up</button>
          </div>
        </div>:''
      }
      {
        (item===authItems.SIGNIN)?
        <div className="authBox">
          <h3>Login to your account</h3>
          <form onSubmit={(e)=>handleSignIn(e)}>
              <input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="email" required  placeholder='Email'/>
              <input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="password" required  placeholder='Password'/>
              <input type="submit" value="Sign In" />
          </form>
          <p>Dont't have an account? <span onClick={()=>{setItem(authItems.SIGNUP);setData({})}}>Sign Up</span></p>
        </div>:''
      }
      {
        (item === authItems.SIGNUP)?
        <div className="authBox">
          <h3>Create your account</h3>
          <form onSubmit={(e)=>handleSignUp(e)}>
              <input value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} type="text" required  placeholder='Name'/>
              <input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="email" required  placeholder='Email'/>
              <input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="password" required  placeholder='Password'/>
              <input value={data.confirmPassword} onChange={(e)=>setData({...data,confirmPassword:e.target.value})} type="password" required  placeholder='Confirm Password'/>
              <input type="submit" value="Sign Up" />
          </form>
          <p>Already have an account? <span onClick={()=>{setItem(authItems.SIGNIN);setData({})}}>Sign In</span></p>
        </div>:''
      }
    </div>
  )
}

export default Authentication