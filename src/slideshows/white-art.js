import React from 'react';

var slideshow = {
  id: 4,
  title: 'white',
  author: 'Max',
  path: 'white-art',
  slides: [
    {
      layout: 'TrMl',
      text: {title: 'Pope Fractal IV', body: ``},
      media: [{type: 'image', filename: 'pope-fractal.png'}]
    },
    {
      layout: 'TlMr',
      text: {title: 'Skiing bum', body: ``},
      media: [{type: 'image', filename: 'ski-bum.png'}]
    },
    {
      layout: 'TrMl',
      text: {title: `The Sun King`},
      media: [{type: 'image', filename: 'sun-king.png'}]
    },
    {
      layout: 'TlMr',
      text: {title: `Upright`},
      media: [{type: 'image', filename: 'upright.png'}]
    },
    {
      layout: 'TlMr',
      text: {title: `Bulb`},
      media: [{type: 'image', filename: 'bulb.png'}]
    }
  ]
};

export default slideshow;
