import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from '../../utils/constant'

const Navigation = () => {
    const [currentIndex,setCurrentIndex]=useState(-1);
    const {pathname}=useLocation();
    const navigate=useNavigate();

    const handleClick=({index,path})=>{
        setCurrentIndex(index);
        navigate(path);
    }
  return (
    <ul className='p-2'>
        {menuItems.map(({title,path},index)=>{
            return(
                <li
                key={title}
                className={`my-2 p-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ${currentIndex===index ||pathname===path? 'bg-blue-500 text-white':""}`}
                onClick={()=>{handleClick({index,path})}}
                >
                
                <Link to ={path}>{title}</Link>
                </li>
            )
        })}
        
    </ul>
  )
}

export default Navigation
