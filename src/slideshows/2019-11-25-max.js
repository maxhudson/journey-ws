import React from 'react';

var slideshow = {
  id: 1,
  title: 'Quality',
  author: 'Max',
  slides: [
    {
      layout: 'TlMr',
      text: {title: 'Flow', body: <>panoramic intuition.<br /><br/><i>not much to it</i></>},
      media: [{type: 'image', filename: '2019-11-25-moss-gradient.jpg'}]
    },
    {
      layout: 'TtrMf',
      text: {title: 'Anxiety', body: 'harsh vibration\nanalyze, judge, repeat\nsweaty feet and hands\nawkward clunkiness\nneurotic fixation'},
      media: [{type: 'video', filename: '2019-11-25-lake.mp4'}]
    },
    {
      layout: 'TrMl',
      text: {title: 'Separation', body: <>boredom<br />polarized eye contact<br />impatience<br />stiffness in the face<br /><i>lack of humor</i></>},
      media: [{type: 'image', filename: '2019-11-25-stump-pads.jpg'}]
    },
    {
      layout: 'TtrMf',
      text: {title: 'Ego', body: `serious\nimportant\nlacking perspective\nalmost beautiful`},
      media: [{type: 'image', filename: '2019-11-25-roots.jpg'}]
    },
    {
      layout: 'TlMr',
      text: {title: 'Love', body: <>pre-sense<br />warm<br/>glowing<br />light</>},
      media: [{type: 'image', filename: '2019-11-25-wood-flow.jpg'}]
    }
  ]
};

export default slideshow;
