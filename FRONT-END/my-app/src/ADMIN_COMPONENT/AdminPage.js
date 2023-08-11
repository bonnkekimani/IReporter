import React from 'react'
import './AdminStyles.css'
import AdminSidebar from './AdminSidebar'
import CardsContainer from './AdminCardsContainer'
import Card from './AdminCard'
import Map from '../User Components/Status'




function AdminPage() {
    return (
        
        
        <>
        <AdminSidebar/>
        {/* <CardsContainer />
        <Card /> */}
        <div >
        <Map />
        </div>



        </>

    )
}

export default AdminPage
