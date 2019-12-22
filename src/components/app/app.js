import {_, Component, React, className} from '@symbolic/react-app'; //eslint-disable-line
import './app.scss';
import max20191125 from 'slideshows/2019-11-25-max';
import max20191128 from 'slideshows/2019-11-28-max';
import artDec19 from 'slideshows/2019-dec-art';
import whiteArt from 'slideshows/white-art';
import lenaLake from 'slideshows/lena-lake';
// import anthony20191125 from 'slideshows/2019-11-25-anthony';
import yard from 'slideshows/yard';
import {Link, Switch, BrowserRouter, Route} from 'react-router-dom';

var slideshows = _.keyBy([max20191125, max20191128, artDec19, whiteArt, yard, lenaLake/*, anthony20191125*/], 'id');

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
  state = {mode: 'default'}

  handleClick = (event) => {
    this.setState({mode: this.state.mode === 'default' ? 'minimal' : 'default'});
  }

  render() {
    var {slide} = this.props;

    return (
      <div {...className(['slide', `layout-${slide.layout}`, `mode-${this.state.mode}`])} onClick={this.handleClick}>
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
    var imageSrcs = _.map(_.filter(_.map(slides, 'media.0'), medium => medium && medium.type === 'image'), 'src');

    return (
      <div {...className(['slideshow', this.state.isTransitioning && 'is-transitioning'])}>
        <div className='preload'>
          {_.map(imageSrcs, src => <img key={src} alt='' {...{src}} />)}
        </div>
        <div className='slides'>
          <Slide slide={slides[this.state.activeSlideIndex]}/>
        </div>
        <div className='footer'>
          <div style={{display: 'flex', alignItems: 'center', lineHeight: '1.3rem', marginBottom: '1rem', textTransform: 'lowercase'}}>
            <Link style={{paddingRight: '1rem', fontSize: '1.5rem'}} to='/'>←</Link>
            {activeSlideshow.title}
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

class Index extends Component {
  render() {
    return (
      <div className='main-index'>
        <div className='index-header'>
          <div className='logo'>
            <img src={`https://maxhudson-website.s3.amazonaws.com/journey-ws/logo-01.png`} alt=''/>
          </div>
          <div className='info'>
            <a href="mailto:maxhud26@gmail.com">maxhud26@gmail.com</a>
          </div>
        </div>
        <div className='slideshows'>
          {_.map(_.reverse(_.reverse([..._.values(slideshows)])), (slideshow) => {
            var mediaUrl = _.get(slideshow, 'slides.0.media.0.src');

            return (
              <Link
                key={slideshow.id}
                {...className(['slideshow'])}
                to={`/s/${slideshow.id}/${_.kebabCase(slideshow.title)}`}
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
            <Route path={['/s/:id/:slug?']} exact component={Slideshow}/>
            <Route path={['/', '']} component={Index}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
