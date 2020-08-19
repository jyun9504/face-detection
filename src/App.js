import React from 'react';
import Particles from 'react-particles-js';
import particlesOption from './assets/particlesOption.js';
import Paper from './components/Paper/Paper';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (user) => {
    this.setState({
      user :{
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined
      }
    })
  }
  calculateFaceLocation = (data) => {
    const inputImg = document.getElementById('input_img');
    return data.outputs[0].data.regions.map((el, i) => {
      const clarifaiFace = el.region_info.bounding_box;
      const width = Number(inputImg.width);
      const height = Number(inputImg.height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        clarifeiWidth: (clarifaiFace.right_col * width) - (clarifaiFace.left_col * width),
        clarifeiHeight: (clarifaiFace.bottom_row * height) - (clarifaiFace.top_row * height),
        key: i
      }
    })
  }
  displayFaceBox = (box) => {
    this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }
  onDetectSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
    fetch('https://agile-plains-81939.herokuapp.com/imageurl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json())
    .then(response => {
      if(!response.status.description === 'Ok'){
        throw Error(response.status);
      }
      fetch('https://agile-plains-81939.herokuapp.com/image', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: this.state.user.id})
      })
      .then(response => response.json())
      .then(data => {})
      return this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="app">
          <Navigation 
            onRouteChange={ this.onRouteChange }
            isSignedIn={ isSignedIn }
          />
          <Particles
            className="particles"
            params={ particlesOption }
          />
          {
            route === 'signin' ? 
              <Paper>
                <SignIn
                  onRouteChange={ this.onRouteChange }
                  loadUser={ this.loadUser }
                />
              </Paper>
            : (route === 'register' ?
                <Paper>
                  <Register 
                    onRouteChange={ this.onRouteChange }
                    loadUser={ this.loadUser }
                  />
                </Paper>
              :
                <Paper>
                  <ImageLinkForm
                    onInputChange={ this.onInputChange }
                    onDetectSubmit={ this.onDetectSubmit }
                  />
                  <FaceRecognition 
                    imageUrl={ imageUrl }
                    box={ box }
                  />
                </Paper>
              )
          }
      </div>
    );
  }
}

export default App;