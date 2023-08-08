import React from 'react'
import "./style.css";
import Dashboard from './Dashboard'

import SideBar from './SideBar';



const UserPage = () => {
  return (
    
    <>
    <SideBar/>
    <div className='container'>
      <Dashboard/>
       
      
    </div>
    
    
    </>
    
  )
}

export default UserPage