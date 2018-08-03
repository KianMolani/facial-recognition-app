import React, { Component } from 'react'; //"dual" import, w/ former using export default and latter using export (specific member, destructuring required)
import Particles from 'react-particles-js'; //as with all but one imports, we're importing a module here, and are taking in the (default) export 'Particles' object
import Clarifai from 'clarifai'; //used for facial recognition api
import NavigationLink from './components/NavigationLink/NavigationLink';
import Icon from './components/Icon/Icon';
import ImageSearchBar from './components/ImageSearchBar/ImageSearchBar';
import Rank from './components/Rank/Rank';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css'; //import of file

/*defining 'app' constant, which contains our api key (to be passed alongside any requests made through the api)*/
const app = new Clarifai.App({
 apiKey: 'f3a918a6725046158a83097ecaf2e9da'
});

/*'particlesOptions' defines properties to pass down to 'Particles' object*/
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}


class App extends Component { //recall: components like JS (pure) functions, where they accept arbitrary (hence why we have to extend the Components class) inputs (defined in constructor) and return React elements (navs, divs, etc.)
  constructor () {
    super();
    this.state = { //state of the "class" (not actually a class in JS, which is proto-type based class (class keyword just syntactic sugar)). JS pure functions get passed states, and return react elements and can update the states
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin', //route is a pretty common state
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; //retrieved by playing with console
    const image = document.getElementById('inputImage'); //retrieve element with specified id (see ImageDisplay.js)
    const width = Number(image.width);
    const height = Number(image.height);
    return { //returns 'box object'
      leftCol: clarifaiFace.left_col*width, //left_col is ratio of overall image ... multiplying by image width (fixed at 500px in our case) gives pixel *width* of left column
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width), //recall: ratio*image width gives rightCol width (in pixels) of overall image
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => { //recall: arrow function so that when calling this., we are talking of being within the scope of this class, not the prop/react element
    this.setState({input:event.target.value}) //setState() rerenders whatever react element has changed, but asynchronously! ... changing input and not imageUrl because we want image to display only after button click
  }

  onImageSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input) //send image link to predict API (asynchronous operation -- promise object); not imageUrl because setState asynchronous (could use callback function)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries : count}))
          })
        }
      this.displayFaceBox(this.calculateFaceLocation(response)) //response is promise (a returned object that, in the case of predict api, contains data coordinates delimiting face)
      })
      .catch(err => console.log(err));
    }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() { //what gets rendered onto the web page
    const { isSignedIn, imageUrl, route, box } = this.state;
    return ( //return (i.e. render) the div
      <div className="App"> {/*className goes to corresponding css and looks for styles in .App*/}
        <Particles className='particles' params={particlesOptions}/> {/*className properties defined in css, params element passes parameters to object ('Particles', in this case)*/}
        <NavigationLink onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home'
          ? <div>
              <Icon />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageSearchBar onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/> {/*we are passing objects onInputChange() and onImageSubmit() objects as arguments to react elements*/}
              <ImageDisplay imageUrl={imageUrl} box={box}/> {/*this used because methods are a property of the app; passing class parameters in, not objects this time*/}
          </div>
          : ( route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
