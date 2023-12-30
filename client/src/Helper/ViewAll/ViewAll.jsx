import React, { useState } from 'react'
import './ViewAll.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaRegPlayCircle } from 'react-icons/fa';
import {TYPE} from '../../Helper/Helper'
import Loader from '../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroller'

const ViewAll = () => {
    const {title} = useParams();
    const {state} = useLocation();
    const navigate = useNavigate();
    console.log(state);
    const [list,setList] = useState(state.data.slice(0,8));
    const [hasMore,setHasMore] = useState(true);
    const loadMoreItems = (page)=>{
        if(list.length >= state.data.length )setHasMore(false);
        else setHasMore(true);
        setList(state.data.slice(0,8+4*page));
    }
  return (
    <div id="ViewAll">
        <h3>{title}</h3>
        <InfiniteScroll threshold={0} pageStart={0} loadMore={loadMoreItems} hasMore={hasMore} loader={<Loader size={50}/>} className="list">
            {
                list.map((item,index)=>(
                    <div onClick={()=>navigate(`/${state.type}/${item.id}`,{state:item})} key={index} className="item">
                        <img src={`https://image.tmdb.org/t/p/original${(window.innerWidth<1000?item.backdrop_path:item.poster_path) || item.profile_path}`} alt="" />
                        <div className="content">
                            <h3>{item.name || item.title}</h3>
                            {
                                state.type===TYPE.PERSON?'':
                                <FaRegPlayCircle className='icon'/>
                            }
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    </div>
  )
}

export default ViewAll