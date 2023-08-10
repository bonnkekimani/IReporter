import React from 'react'
import './AdminStyles.css'
import Sidebar from './AdminSidebar'
import CardsContainer from './AdminCardsContainer'
import Card from './AdminCard'
import Map from '../User Components/Status'




function AdminPage() {
    return (
        
        
        <>
        <Sidebar />
        {/* <CardsContainer /> */}
        {/* <Card /> */}
        <div >
        <Map />
        </div>



        </>

    )
}

export default AdminPage
