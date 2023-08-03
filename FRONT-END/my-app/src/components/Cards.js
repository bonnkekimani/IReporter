import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Latest News and Updates!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Ruto.jpg'
              text='President Ruto orders Murkomen to fire corrupt official'
              label='President Ruto'
              path='/services'
            />
            <CardItem
              src='images/Murkomen.jpg'
              text='Corrupt to the core, official left ministry in May'
              label='Murkomen'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Kiambu.jpg'
              text='Kiambu Deputy Speaker John Njue arrested over Sh130,000 bribe'
              label='Kiambu'
              path='/services'
            />
            <CardItem
              src='images/Ghana.jpg'
              text='Former Ghanian Minister arrested in Sh142.1 million scandal'
              label='Ghana'
              path='/products'
            />
            <CardItem
              src='images/Migori.jpg'
              text='How a trader in Migori mega heist opened secret accounts'
              label='Migori'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
