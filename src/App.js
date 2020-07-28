import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import particlesOption from './assets/particlesOption.js';
import Paper from './components/Paper/Paper';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'a817d514bb4e4018917cb7a66db9819b'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImg = document.getElementById('input_img');
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);
    console.log(width, height)
    console.log((clarifaiFace.right_col * width) - (clarifaiFace.left_col * width), (clarifaiFace.bottom_row * height) - (clarifaiFace.top_row * height))
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      clarifeiWidth: (clarifaiFace.right_col * width) - (clarifaiFace.left_col * width),
      clarifeiHeight: (clarifaiFace.bottom_row * height) - (clarifaiFace.top_row * height),
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
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
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="app">
          <Navigation />
          <Particles
            className="particles"
            params={ particlesOption }
          />
          <Paper>
            <ImageLinkForm
              onInputChange={ this.onInputChange }
              onDetectSubmit={ this.onDetectSubmit }
            />
            <FaceRecognition 
              imageUrl={ this.state.imageUrl }
              box={this.state.box}
            />
          </Paper>
      </div>
    );
  }
}

export default App;
