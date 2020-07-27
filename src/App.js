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
      input: ''
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value)
  }
  onDetectSubmit = () => {
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg"
    )
    .then(
      function(response) {
        console.log(response)
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
          <Paper className="">
            <ImageLinkForm
              onInputChange={ this.onInputChange }
              onDetectSubmit={ this.onDetectSubmit }
            />
            <FaceRecognition />
          </Paper>
      </div>
    );
  }
}

export default App;
