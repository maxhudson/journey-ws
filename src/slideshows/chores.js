// import React from 'react';

var slideshow = {
  title: 'chores',
  path: 'chores',
  key: 'chores',
  slides: [
    {
      layout: 'TrMl',
      text: {title: 'Square One', body: `If I don't restore appliances, sinks, and other gross things to "like new" occasionally, they'll become irreversibly gunky before long.\n\nFind a way to get rid of the fingerprints, the stuff in the cracks, the thin film of semi-permanent grime.`},
      media: [{type: 'image', filename: 'chores-1.jpg'}]
    },
    {
      layout: 'TlMr',
      text: {title: 'Dishes', body: `Doing someone else's dishes feels better than doing my own.\n\nIf I do someone else's dishes, they might do some of mine.\n\nI can give and get clean dishes - or trudge through my own and avoid others - for the same amount of work.\n\nJust don't expect anything.`},
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
