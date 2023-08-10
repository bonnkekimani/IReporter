import React from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import "./style.css";
import {Link} from "react-router-dom"
function SideBar () {
  return (
    <nav className='nav'>
        <Link to="" className='site-title'>
            IREPORTER</Link>
        <ul>
        <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link to='/map'>Map</Link>
            </li>
            <li>
                <Link to='/reportform'>File Report</Link>
            </li>
            <li>
                <Link to='/reportlist'>All Reports</Link>
            </li>
            <li>
            <Link to='/denied'><PersonPinIcon className="img-2"/></Link> 
            </li>
        </ul>
       
    </nav>
  )
}

export default SideBar 
