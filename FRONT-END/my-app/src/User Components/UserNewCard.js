import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Slider from "react-slick";
import "./style.css";

const NextArrow = (props) =>{
    const {onClick} = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='next'>
                <i className='fa fa-long-arrow-alt-right'><ArrowForwardIosIcon/></i>
            </button>
        </div>
    )
}
const PrevArrow = (props) =>{
    const {onClick} = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='prev'>
                <i className='fa fa-long-arrow-alt-left'><ArrowBackIosNewIcon/></i>
            </button>
        </div>
    )
}
const UserNewCard = ({ productItems, addToCart }) => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount (count + 1)

    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow:<NextArrow />,
        prevArrow:<PrevArrow />,
      };
  return (
    
    <>
     <Slider {...settings}>
    {
        productItems?.map (( productItems ) =>{

        return (
        <div className='box'>
            <div className='product mtop'>
                <div className='img'>
                    <span className='discount'>{productItems.discount}% Off</span>
                    <img src={productItems.cover} alt="picha here"/>
                    <div className='product-like'>
                        <label>0</label><br />
                        <i className='fa-regular fa-heart' onClick={increment}><FavoriteBorderIcon/></i>
                    </div>
                </div>
                <div className='product-details'>
                    <h3>{productItems.name}</h3>
                    <div className='rate'>
                        <i className='fa fa star'><StarIcon/></i>
                        <i className='fa fa star'><StarIcon/></i>
                        <i className='fa fa star'><StarIcon/></i>
                        <i className='fa fa star'><StarIcon/></i>
                        <i className='fa fa star'><StarIcon/></i>
                    </div>
                    <div className='price'>
                        <h4>{productItems.price}.00</h4>
                        <button onClick={() => addToCart(productItems)}>
                            <i className='fa fa-plus'><AddIcon/></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
        })}
    </Slider>
    </>
  )
}

export default UserNewCard