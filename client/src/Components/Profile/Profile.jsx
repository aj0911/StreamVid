import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscriptions } from '../../Helper/Helper'
import { FaCrown, FaDoorClosed, FaRegPlayCircle } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from '../../Helper/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import {  remove } from '../../Reducers/ListsReducer'
import { logout } from '../../Reducers/Auth'
import { toast } from 'react-toastify'


const Profile = () => {
    // States
    const auth = useSelector(state=>state.auth);
    const lists = useSelector(state=>state.lists);
    const [type,setType] = useState(window.innerWidth>999?0:1);
    const [data,setData] = useState(window.innerWidth>999?lists.myList.find(x=>x.user.email === auth.user?.email)?.items:lists.watchLater.find(x=>x.user.email === auth.user?.email)?.items);
    const [list,setList] = useState([]);
    const [hasMore,setHasMore] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadMoreItems = (page)=>{
        if(list?.length >= data?.length )setHasMore(false);
        else setHasMore(true);
        setList(data?.slice(0,8+4*page));
    }
    const handleRemove = (item)=>{
        dispatch(remove({
            type,
            removeId:item.id,
            user:auth.user
        }));
        toast.success('Element removed from the list');
        setData([])
    }
    useEffect(()=>{
        if(!auth.isAuth)navigate('/Auth')
    },[])
    useEffect(()=>{
        if(type===0){
            setData(lists.myList.find(x=>x.user.email === auth.user?.email)?.items);
        }
        else if(type ===1){
            setData(lists.watchLater.find(x=>x.user.email === auth.user?.email)?.items);
        }
        setList(data?.slice(0,8));
    },[data])

  return (
    <div id="Profile">
        <div className="top">
            <div className="img">
                <h3>
                    {
                        auth.user?.name.split(' ').map(x=>x[0])
                    }
                </h3>
                <h2>{auth.user?.name}</h2>
            </div>
            {
                (auth.user?.subscription?.name === subscriptions[2].name)?"":
                <button onClick={()=>navigate('/Subscription')}>
                    <h3>upgrade premium</h3>
                    <FaCrown className='icon'/>
                </button>
            }
            <button onClick={()=>{dispatch(logout());toast.success('Logout Successfully');navigate('/Auth')}}>
                <h3>Logout</h3>
                <FaDoorClosed className='icon'/>
            </button>
        </div>
        <div className="bottom">
            <div className="tags">
                <button className={type===0?'active':''} onClick={()=>{setData(lists.myList.find(x=>x.user.email === auth.user?.email)?.items);setType(0)}}>My List</button>
                <button className={type===1?'active':''} onClick={()=>{setData(lists.watchLater.find(x=>x.user.email === auth.user?.email)?.items);setType(1)}}>Watch Later</button>
            </div>
            {
                data?.length>0?
                <InfiniteScroll threshold={0} pageStart={0} loadMore={loadMoreItems} hasMore={hasMore} loader={<Loader size={50}/>} className="list">
                    {
                        list?.map((item,index)=>(
                            <div key={index} className="item">
                                <img src={`https://image.tmdb.org/t/p/original${(window.innerWidth<1000?item.backdrop_path:item.poster_path) || item.profile_path}`} alt="" />
                                <div className="content">
                                    <h3 onClick={()=>navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})}>{item.name || item.title}</h3>
                                    <FaRegPlayCircle onClick={()=>navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})} className='icon'  />
                                    <AiOutlineCloseCircle onClick={()=>handleRemove(item)} className='close'/>
                                </div>
                            </div>
                        ))
                    }
                </InfiniteScroll>
                :
                <div className="no-data">
                    <img src={require('../../Assets/empty.png')} alt="" />
                    <h3>List is empty!!!</h3>
                    <p>Add some Movies and  TV shows to your list in order to make your own list of favourite Movies and  TV shows</p>
                </div>
            }
        </div>
    </div>
  )
}

export default Profile