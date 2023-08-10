import React from 'react'
import ReportsList from './ReportsList'

const Flash = ({ productItems }) => {
  return (
    <>
    <section className='flash background'>
        <div className='container'>
            <div className='heading f_flex'>
            
            <h1>DASHBOARD</h1> 
            
        </div>
        <ReportsList productItems={ productItems }/>
        </div>
    </section>
    </>
  )
}

export default Flash