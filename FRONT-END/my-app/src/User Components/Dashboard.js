import React from "react";
import "./style.css";
import SlideCard from "./SlideCard";
import Flash from "./Flash";




function Dashboard(){
  return (
    <div style={{ width: '90%',marginLeft: '200px', height: '400px' }}> 
  
    <SlideCard/>
    <Flash/>
    </div>
   
  );
}
export default Dashboard