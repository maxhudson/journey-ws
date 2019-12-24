import React from 'react';
import {Link} from 'react-router-dom';
import './header.scss';

export default function() {
  return (
    <div className='header'>
      <Link to='/' className='logo'>
        <img src={`https://maxhudson-website.s3.amazonaws.com/journey-ws/logo-01.png`} alt=''/>
      </Link>
      <div className='info'>
        <Link to='/info'>more info</Link>
      </div>
    </div>
  );
}
