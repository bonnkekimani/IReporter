import React from 'react'
import Sdata from './Sdata'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    appendDots:(dots)=>{
      return <ul style ={{margin : "0px"}}>{dots}</ul>
    }
  };
  return (
  <>
  <Slider {...settings}>
  {Sdata.map((value,index)=>{
    return (
      <div className='box d_flex top' >
    
     <div className='left' style={{ width: '50%',marginLeft: '200px', height: '300px' }}>
       <h1>{value.title}</h1>
       <p>{value.desc}</p>
       <div className='right'>
        <img src={value.cover} alt='images' style={{ width: '100px', height: '100px', objectFit:'contain',marginBottom:'10px'}}/>

     </div>
       <a href='https://www.standardmedia.co.ke/corporate/'><button className='btn-primary'>READ MORE</button></a>
       
     </div>
     
`   </div>
    ) 

  })

  }
   </Slider>
  </>
    
  )
}

export default SlideCard