import {_, Component, React, className} from '@symbolic/react-app'; //eslint-disable-line
import './app.scss';
import max20191125 from 'slideshows/2019-11-25-max';
import anthony20191125 from 'slideshows/2019-11-25-anthony';

var slideshows = {max20191125/*, anthony20191125*/};

var Medium = ({medium}) => {
  var src = `https://maxhudson-website.s3.amazonaws.com/journey-ws/${medium.filename}`;

  return (
    <div className='medium'>
      {medium.type === 'image' ? (
        <img src={src}/>
      ) : (
        <video loop autoPlay muted>
          <source type='video/mp4' src={src}/>
        </video>
      )}
    </div>
  );
}

var SlideText = ({text}) => {


  return (
    <div className='slide-text'>
      <div className='text-title'>{text.title}</div>
      <div className='text-subtitle'></div>
      <div className='text-body'>{text.body}</div>
    </div>
  )
}

var Slide = ({slide}) => {

  return (
    <div {...className(['slide', `layout-${slide.layout}`])}>
      <SlideText text={slide.text}/>
      <div className='media'>
        {_.map(slide.media, medium => (
          <Medium {...{medium}} />
        ))}
      </div>
    </div>
  );
}

export default class App extends Component {
  state = {activeSlideIndex: 0, activeSlideshowKey: 'max20191125'};

  render() {
    var slideshow = slideshows[this.state.activeSlideshowKey];
    var {slides} = slideshow;

    return (
      <div className='app'>
        <div className='slideshow'>
          <div className='slides'>
            <Slide slide={slides[this.state.activeSlideIndex]}/>
          </div>
          <div className='footer'>
            <div className='slideshow-buttons'>
              {_.map(slideshows, (slideshow, key) => (
                <div
                  {...className(['slideshow-button', key === this.state.activeSlideshowKey && 'active'])}
                  onClick={() => this.setState({activeSlideshowKey: key, activeSlideIndex: 0})}
                >{slideshow.title}<span>{slideshow.author}</span></div>
              ))}
            </div>
            <div className='index-buttons'>
              {_.map(slides, (slide, index) => (
                <div
                  {...className(['index-button', index === this.state.activeSlideIndex && 'active'])}
                  onClick={() => this.setState({activeSlideIndex: index})}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }
}
