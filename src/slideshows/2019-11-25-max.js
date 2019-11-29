import React from 'react';

var slideshow = {
  id: 1,
  title: 'Qualities',
  author: 'Max',
  slides: [
    {
      layout: 'TlMr',
      text: {title: 'Flow', body: <>panoramic intuition.<br /><br/><i>not much to it</i></>},
      media: [{type: 'image', filename: '2019-11-25-moss-gradient.jpg'}]
    },
    {
      layout: 'TtrMf',
      text: {title: 'Anxiety', body: 'vibrating harshness\nanalyze, judge, repeat\nsweaty feet and hands\nawkward clunkiness\nneurotic attempts to fix'},
      media: [{type: 'video', filename: '2019-11-25-lake.mp4'}]
    },
    {
      layout: 'TrMl',
      text: {title: 'Separation', body: <>wanting distraction<br />polarized eye contact<br />annoyance, impatience<br />stiffness in the face<br /><i>lack of humor</i></>},
      media: [{type: 'image', filename: '2019-11-25-stump-pads.jpg'}]
    },
    {
      layout: 'TtrMf',
      text: {title: 'Ego', body: `serious, important\nlacking perspective\nalmost beautiful`},
      media: [{type: 'image', filename: '2019-11-25-roots.jpg'}]
    },
    {
      layout: 'TlMr',
      text: {title: 'Love', body: <>no questions<br />pre-sense connection<br />warm<br/>glowing<br />light</>},
      media: [{type: 'image', filename: '2019-11-25-wood-flow.jpg'}]
    }
  ]
};

export default slideshow;
