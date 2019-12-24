import {_, Component, React, className} from '@symbolic/react-app'; //eslint-disable-line
import './app.scss';
import max20191125 from 'slideshows/2019-11-25-max';
import max20191128 from 'slideshows/2019-11-28-max';
import artDec19 from 'slideshows/2019-dec-art';
import whiteArt from 'slideshows/white-art';
import lenaLake from 'slideshows/lena-lake';
import man from 'slideshows/man';
import tiger from 'slideshows/tiger';
// import anthony20191125 from 'slideshows/2019-11-25-anthony';
import yard from 'slideshows/yard';
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom';
import Header from 'components/header/header';
import InfoPage from 'components/pages/info/info-page.js';
import {Swipeable} from 'react-swipeable';

var slideshows = _.keyBy([max20191125, max20191128, artDec19, whiteArt, yard, lenaLake, man, tiger/*, anthony20191125*/], 'id');

_.forEach(slideshows, slideshow => {
  var {path} = slideshow;

  _.forEach(slideshow.slides, slide => {
    _.forEach(slide.media, medium => {
      medium.src = `https://maxhudson-website.s3.amazonaws.com/journey-ws/${path ? path + '/' : ''}${medium.filename}`;
    });
  });
});


//TODO
//better media hosting (imgur?)
//better index

var Medium = ({medium}) => {
  return (
    <div className='medium'>
      {medium.type === 'image' ? (
        <img src={medium.src} alt=''/>
      ) : (
        <video loop autoPlay muted playsInline>
          <source type='video/mp4' src={medium.src}/>
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

class Slide extends Component {
  handleClick = (event) => this.props.toggleIsFullscreen();

  render() {
    var {slide} = this.props;

    return (
      <div {...className(['slide', `layout-${slide.layout}`, `mode-${this.props.isFullscreen ? 'minimal' : ''}`])} onClick={this.handleClick}>
        <SlideText text={slide.text}/>
        <div className='media'>
          {_.map(slide.media, (medium) => (
            <Medium key={JSON.stringify(medium)} {...{medium}} />
          ))}
        </div>
      </div>
    );
  }
}

class Slideshow extends Component {
  state = {index: 0, isFullscreen: false};

  componentDidMount() {
    this.setState({id: _.get(this.props, 'match.params.id')});

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (_.get(prevProps, 'match.params.id') !== _.get(this.props, 'match.params.id')) {
      var id = _.get(this.props, 'match.params.id');

      this.transitionSlide(() => this.setState({index: 0, id}));
    }
  }

  transitionSlide = (fn) => {
    this.setState({isTransitioning: true}, () => {
      setTimeout(() => {
        fn();

        setTimeout(() => this.setState({isTransitioning: false}), 0);
      }, 0);
    })
  }

  toggleIsFullscreen = () => this.setState(({isFullscreen}) => ({isFullscreen: !isFullscreen}));

  next = () => this.setIndex(this.state.index + 1);
  prev = () => this.setIndex(this.state.index - 1);

  setIndex = (index) => {
    var {slides} = this.slideshow;
    var count = slides.length;

    this.setState({index: (index + count) % count});
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 39) this.next();
    if (event.keyCode === 37) this.prev();
  }

  get slideshow() {
    return _.get(slideshows, _.get(this.state, 'id'), _.first(_.values(slideshows)));
  }

  render() {
    var {slideshow} = this;
    var activeSlideshow = slideshow;
    var {slides} = slideshow;
    var imageSrcs = _.map(_.filter(_.map(slides, 'media.0'), medium => medium && medium.type === 'image'), 'src');

    return (
      <Swipeable
        {...className(['slideshow', this.state.isTransitioning && '--is-transitioning'])}
        preventDefaultTouchmoveEvent
        onSwipedLeft={this.next}
        onSwipedRight={this.prev}
        delta={3}
      >
        <div className='preload'>
          {_.map(imageSrcs, src => <img key={src} alt='' {...{src}} />)}
        </div>
        <div className='slides'>
          <Slide slide={slides[this.state.index]} {..._.pick(this, 'toggleIsFullscreen')} isFullscreen={this.state.isFullscreen}/>
        </div>
        <div className='footer'>
          <div style={{display: 'flex', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'lowercase'}}>
            <span style={{flexGrow: 1}}>{activeSlideshow.title}</span>
            <Link className='button' to='/'>back</Link>
            <div className='button toggle-is-fullscreen' onClick={() => this.toggleIsFullscreen()}>change view</div>
          </div>
          <div className='index-buttons'>
            {_.map(slides, (slide, index) => (
              <div
                key={`${slideshow.id}-${index}`}
                {...className(['index-button', index === this.state.index && 'active'])}
                onClick={() => this.transitionSlide(() => this.setState({index: index}))}
              />
            ))}
          </div>
        </div>
      </Swipeable>
    );
  }
}

class Index extends Component {
  state = {isLoaded: false};

  componentDidMount() {
    setTimeout(() => this.setState({isLoaded: true}));
  }

  render() {
    return (
      <div {...className(['main-index', this.state.isLoaded && 'is-loaded'])}>
        <Header />
        <div className='slideshows'>
          {_.map(_.orderBy(_.values(slideshows), 'id'), (slideshow, index) => {
            var mediaUrl = _.get(slideshow, 'slides.0.media.0.src');

            return (
              <Link
                key={slideshow.id}
                {...className(['slideshow'])}
                to={`/s/${slideshow.id}/${_.kebabCase(slideshow.title)}`}
                style={{transitionDelay: `${0.5 + 0 * index}s`}}
              >
                <div className='thumbnail' style={{backgroundImage: `url(${mediaUrl})`}}/>
                <div className='slideshow-title'>{slideshow.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Switch>
            <Route path={['/info']} exact component={InfoPage}/>
            <Route path={['/s/:id/:slug?']} exact component={Slideshow}/>
            <Route path={['/', '']} component={Index}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
