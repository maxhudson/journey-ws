import {_, Component, React, className} from '@symbolic/react-app'; //eslint-disable-line
import './app.scss';
import max20191125 from 'slideshows/2019-11-25-max';
import max20191128 from 'slideshows/2019-11-28-max';
import anthony20191125 from 'slideshows/2019-11-25-anthony';
import {Link, BrowserRouter, Route} from 'react-router-dom';

var slideshows = _.keyBy([max20191125, max20191128/*, anthony20191125*/], 'id');

var srcForFilename = (filename) => `https://maxhudson-website.s3.amazonaws.com/journey-ws/${filename}`;

//TODO
//better media hosting (imgur?)
//better index

var Medium = ({medium}) => {
  var src = srcForFilename(medium.filename);

  return (
    <div className='medium'>
      {medium.type === 'image' ? (
        <img src={src}/>
      ) : (
        <video loop autoPlay muted playsInline>
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
        {_.map(slide.media, (medium) => (
          <Medium key={JSON.stringify(medium)} {...{medium}} />
        ))}
      </div>
    </div>
  );
}

class Slideshow extends Component {
  state = {activeSlideIndex: 0};

  transitionSlide = (fn) => {
    this.setState({isTransitioning: true}, () => {
      setTimeout(() => {
        fn();

        setTimeout(() => this.setState({isTransitioning: false}), 100);
      }, 500);
    })
  }

  componentDidMount() {
    this.setState({id: _.get(this.props, 'match.params.id')});
  }

  componentDidUpdate(prevProps) {
    if (_.get(prevProps, 'match.params.id') !== _.get(this.props, 'match.params.id')) {
      var id = _.get(this.props, 'match.params.id');

      this.transitionSlide(() => this.setState({activeSlideIndex: 0, id}));
    }
  }

  render() {
    var slideshow = _.get(slideshows, _.get(this.state, 'id'), _.first(_.values(slideshows)));
    var activeSlideshow = slideshow;
    var {slides} = slideshow;
    var imageSrcs = _.map(_.filter(_.map(slides, 'media.0'), medium => medium && medium.type === 'image'), medium => srcForFilename(medium.filename));

    return (
      <div {...className(['slideshow', this.state.isTransitioning && 'is-transitioning'])}>
        <div className='preload'>
          {_.map(imageSrcs, src => <img key={src} alt='' {...{src}} />)}
        </div>
        <div className='slides'>
          <Slide slide={slides[this.state.activeSlideIndex]}/>
        </div>
        <div className='footer'>
          <div className='slideshow-buttons'>
            {_.map(slideshows, (slideshow) => (
              <Link
                key={slideshow.id}
                {...className(['slideshow-button', slideshow.id === activeSlideshow.id && 'active'])}
                to={`/slideshows/${slideshow.id}/${_.kebabCase(slideshow.title)}`}
              >{slideshow.title}<span>{/*slideshow.author*/}</span></Link>
            ))}
          </div>
          <div className='index-buttons'>
            {_.map(slides, (slide, index) => (
              <div
                key={`${slideshow.id}-${index}`}
                {...className(['index-button', index === this.state.activeSlideIndex && 'active'])}
                onClick={() => this.transitionSlide(() => this.setState({activeSlideIndex: index}))}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route path={['/slideshows/:id/:slug?', '', '/']} component={Slideshow}/>
        </div>
      </BrowserRouter>
    );
  }
}
