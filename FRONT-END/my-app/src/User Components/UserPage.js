import React from 'react'
import "./style.css";
import Dashboard from './Dashboard'
import UserSideBar from './UserSideBar';





const UserPage = () => {
  return (
    
    <div className='userpage'>
    <UserSideBar/> 
    <div className='container'>
     
    <Dashboard/>
     
      
    </div>
    
    
    </div>
    
  )
}

export default UserPage