import React from 'react'
import { Link } from 'react-router-dom';

export default function Leftmenu() {
  const menus = [{name:"product 1", link:"/"},{name: "product 2", link:"/product2"},{name: "student management", link:"/product3"}]
  return (
    <div className='border'>
        {menus.map((item)=>{
          return(
            <div key={item.name}>
            <Link to={item.link}>{item.name}</Link>
            </div>
          )})}
    </div>
  )
}