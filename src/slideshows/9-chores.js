// import React from 'react';

var slideshow = {
  id: 9,
  title: 'chores',
  path: 'chores',
  key: 'chores',
  slides: [
    {
      layout: 'TrMl',
      text: {title: 'Square One', body: `Always reset.\n\nIf I don't clean appliances, sinks, and other weird, gross things to the point where they look like new, they'll keep getting worse.`},
      media: [{type: 'image', filename: 'chores-1.jpg'}]
    },
    {
      layout: 'TlMr',
      text: {title: 'Dishes', body: `Doing someone else's dishes feels better than doing my own. \n\nIf I do someone else's dishes, they might do some of mine.\n\nI give and receive the gift of clean dishes for the same amount of work as trudging through my own dishes and avoiding someone else's.`},
      media: [{type: 'image', filename: 'chores-2.jpg'}]
    },
    {
      layout: 'TrMl',
      text: {title: 'The Toilet', body: `Wipe it down every time you use it.`},
      media: [{type: 'image', filename: 'chores-3.jpg'}]
    }
  ]
};

export default slideshow;
