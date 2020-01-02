import React from 'react';
import './info-page.scss';
import Header from 'components/header/header';

export default function() {
  return (
    <div className='info-page'>
      <Header />
      <div className='page-content'>
        a mix of drawing, digital art, photography, and writing by mister maxwell hudson.
        <br /><br />
        if you get a chance, look at this on a computer - it's cooler!
        <br /><br />
        most of this art is for sale - either in print or original form. please email me
        for specific prices. if you're interested in a few pieces, i'll sell for a lower combined price!
        <br/><br/><br/>
        instagram: <a href="https://instagram.com/artofmx">@artofmx</a><br/>
        email: <a href="mailto:maxhud26@gmail.com">maxhud26@gmail.com</a>
      </div>
    </div>
  );
}
