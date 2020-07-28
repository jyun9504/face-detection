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
      imageUrl: ''
    }
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
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {
        // there was an error
      }
    );
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
            />
          </Paper>
      </div>
    );
  }
}

export default App;
