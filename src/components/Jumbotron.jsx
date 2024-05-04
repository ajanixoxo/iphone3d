import React from 'react';
import Iphone14 from '../assets/images/iphone-14.jpg';
import HoldingPhone from '../assets/images/iphone-hand.png';

function Jumbotron() {
    const handleScroll = () => {
        const element = document.querySelector('.sound-section');
        window.scrollTo({
            top:element?.getBoundingClientRect().top,
            left:0,
            behavior:'smooth'
        })
    }
  return (
    <div className="jumbotron-section wrapper">
        <h2 className='title'>New</h2>
        <img src={Iphone14} alt='Iphone 14 Pro'/>
        <p className='text'>Big and Bigger</p>
        <span className='description'>
            I sha know that the phone is good but i don't like the way it is over hype
        </span>
        <ul className='links'>
            <li>
                <button className='button' >Buy</button>
            </li>
            <li>
               <a className='link' onClick={handleScroll} >Learn more</a>
            </li>
        </ul>
        <img src={HoldingPhone} alt='phone' className='iphone-img'/>
    </div>
  )
}

export default Jumbotron