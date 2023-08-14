import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Signup from './signup';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>STOP CORRUPTION</h1>
      <p>Ripoti ufisadi leo</p>
      <div className='hero-btns'>
        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          LOGIN
        </Button> */}

        <Link to={'login'} className='btn-mobile'>

        <Button 
        
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          LOGIN
        </Button>
        </Link>

        <Link to={'sign-up'} className='btn-mobile'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          REGISTER
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
