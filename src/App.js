import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import particlesOption from './assets/particlesOption.js';
import Paper from './components/Paper/Paper';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';

const app = new Clarifai.App({
  apiKey: 'a817d514bb4e4018917cb7a66db9819b'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin'
    }
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
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then(response => {
      if(!response.status.description === 'Ok'){
        throw Error(response.status);
      }
      return this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }
  onRouteChange = (route) => {
    this.setState({route: route})
  }
  render() {
    return (
      <div className="app">
          <Navigation 
            onRouteChange={ this.onRouteChange }
          />
          <Particles
            className="particles"
            params={ particlesOption }
          />
          {
            this.state.route === 'signin' 
              ? <Paper>
                  <SignIn
                    onRouteChange={ this.onRouteChange }
                  />
                </Paper>
              : <Paper>
                  <ImageLinkForm
                    onInputChange={ this.onInputChange }
                    onDetectSubmit={ this.onDetectSubmit }
                  />
                  <FaceRecognition 
                    imageUrl={ this.state.imageUrl }
                    box={ this.state.box }
                  />
                </Paper>
          }
      </div>
    );
  }
}

export default App;
