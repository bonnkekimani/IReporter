import React from "react";
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import EditIcon from '@mui/icons-material/Edit';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import "./style.css";

function Status(){
  return (
    <div className="element-homepage-rejected">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-2">
            <div className="ellipse" />
            <div className="HERO">
              <div className="info-service">
                <div className="div-wrapper">
                  <div className="text-wrapper">Created: 24/02/2019</div>
                </div>
                {/* <img className="ellipse-2" alt="Ellipse" src="ellipse-1.png" /> */}
                <div className="group-2">
                  <div className="text-wrapper-2">Blaze | Service Main</div>
                  <div className="group-3">
                    <div className="text-wrapper-3">REJECTED</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <h1 className="h-1">Reports Overview</h1>
          <div className="overlap-3">
            <div className="HEADER">
            </div>
            <img className="line" alt="Line" src="line-3.svg" />
          </div>
          <div className="overlap-4">
            <p className="p">
              You submitted on your Letter of Authorization (LOA) is different from what is on file with your carrier in
              their Customer Service Record (CSR). A CSR is a copy of how your telephone records appear in the telephone
              company’s database.
            </p>
            <ThumbDownIcon className="rejected-instance" />
            <div className="text-wrapper-5">Your Report is rejected!</div>
            <p className="text-wrapper-6">You may edit your report and then send it for the approval.</p>
            <div className="text-wrapper-7">Edit Your Report</div>
            <EditIcon className="icon-edit" color="#343A40" />
            <div className="overlap-group-wrapper">
              <div className="overlap-5">
                <div className="text-wrapper-8">Edit Report</div>
              </div>
            </div>
          </div>
          <div className="overlap-6">
            <p className="text-wrapper-9">We’re online and ready to help you!</p>
            <div className="MAP">
              <div className="overlap-7">
                
                <div className="mask-group-wrapper">
                  <img className="mask-group" alt="Mask group" src="mask-group.png" />
                </div>
                <div className="LOC">
                  <div className="EU">
                    <div className="bars">
                      <div className="bar" />
                      <div className="bar-2" />
                    </div>
                    <div className="text-wrapper-10">Nairobi</div>
                    <div className="text-wrapper-11">580 Users</div>
                  </div>
                  <div className="asia">
                    <div className="bars">
                      <div className="bar" />
                      <div className="bar-3" />
                    </div>
                    <div className="text-wrapper-12">Nakuru</div>
                    <div className="text-wrapper-11">103 Users</div>
                  </div>
                  <div className="africa">
                    <div className="bars">
                      <div className="bar" />
                      <div className="bar-4" />
                    </div>
                    <div className="text-wrapper-13">Kisumu</div>
                    <div className="text-wrapper-11">239 Users</div>
                  </div>
                  <div className="AUS">
                    <div className="bars">
                      <div className="bar" />
                      <div className="bar-5" />
                    </div>
                    <div className="text-wrapper-14">Mombasa</div>
                    <div className="text-wrapper-15">78 Users</div>
                  </div>
                  <div className="america">
                    <div className="bars">
                      <div className="bar" />
                      <div className="bar-6" />
                    </div>
                    <div className="text-wrapper-16">Eldoret</div>
                    <div className="text-wrapper-15">78 Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Status