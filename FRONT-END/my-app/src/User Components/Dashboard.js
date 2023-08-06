import React from "react";
import "./style.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PendingIcon from '@mui/icons-material/Pending';
import RecommendIcon from '@mui/icons-material/Recommend';
import RecentActorsIcon from '@mui/icons-material/RecentActors';


function Dashboard(){
  return (
    // <div className="main-frame">
      <div className="main-frame">
        <div className="title">
          <div className="text-wrapper-9">Dashboard</div>
          <div className="icon">
             <DashboardIcon className="vector-7"/>
            
          </div>
        </div>
        <div className="title-2">
          <div className="text-wrapper-9">Recent Reports</div>
          <div className="icon">
            <RecentActorsIcon className="icon-2"/>
          </div>
        </div>
        <div className="widgetes">
          <div className="widget">
            <div className="overlap-group-2">
              <AddToPhotosIcon className="vector-8"/>
              <div className="text-wrapper-10">Total Reports</div>
              <h1 className="text-wrapper-11">10,120</h1>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-12">Pending Reports</div>
              <div className="text-wrapper-13">5,120</div>
              <PendingIcon className="vector-9"/>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-3">
              <div className="text-wrapper-14">Approved Reports</div>
              <div className="text-wrapper-11">5,000</div>
              <RecommendIcon className="vector-10" />
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text-wrapper-15">Name</div>
          <div className="text-wrapper-16">Email</div>
          <div className="text-wrapper-17">Submitted</div>
          <div className="text-wrapper-18">Type</div>
          <div className="text-wrapper-19">Status</div>
        </div>
        <div className="group-2">
          <div className="text-wrapper-20">Prem Shahi</div>
          <div className="text-wrapper-21">premshahi@gmail.com</div>
          <div className="text-wrapper-22">2022-02-12</div>
          <div className="text-wrapper-23">Pending</div>
          <div className="text-wrapper-24">New</div>
        </div>
        <div className="group-3">
          <div className="text-wrapper-20">Deepa Chand</div>
          <div className="text-wrapper-25">deepachand@gmail.com</div>
          <div className="text-wrapper-26">2022-02-12</div>
          <div className="text-wrapper-27">New</div>
          <div className="text-wrapper-28">Approved</div>
        </div>
        <div className="group-4">
          <div className="text-wrapper-20">Prakash Shahi</div>
          <div className="text-wrapper-21">prakashshhi@gmail.com</div>
          <div className="text-wrapper-22">2022-02-13</div>
          <div className="text-wrapper-24">Old</div>
          <div className="text-wrapper-23">Denied</div>
        </div>
        <div className="group-5">
          <div className="text-wrapper-20">Manisha Chand</div>
          <div className="text-wrapper-21">manishachand@gmail.com</div>
          <div className="text-wrapper-22">2022-02-13</div>
          <div className="text-wrapper-24">Old</div>
          <div className="text-wrapper-23">Approved</div>
        </div>
       
    </div>
    
  );
}
export default Dashboard