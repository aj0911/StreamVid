import React from 'react'
import './ListView.css'
import Title from '../Title/Title'
import { FaRegPlayCircle } from 'react-icons/fa'

const ListView = ({title,viewMore = true,data,count=10,largeSize=false}) => {
  return (
    <div className="ListView">
        <Title title={title} viewMore={viewMore}/>
        <div className="list">
            {
                (data.length>0)?
                data.slice(0,count).map((item,index)=>(
                    <div key={index} className={`item ${(largeSize)?'largeSize':''}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
                        <FaRegPlayCircle className='icon'/>
                        <button>Add to My List</button>
                    </div>
                )):''
            }
        </div>
    </div>
  )
}

export default ListView