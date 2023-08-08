import React from 'react'
import UserNewCard from './UserNewCard'

const Flash = ({ productItems }) => {
  return (
    <>
    <section className='flash background'>
        <div className='container'>
            <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>DASHBOARD</h1> 
        </div>
        <UserNewCard productItems={ productItems }/>
        </div>
    </section>
    </>
  )
}

export default Flash