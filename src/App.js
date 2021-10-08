import React, { Component } from "react";
import Clarifai from 'clarifai';
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Rank from "./Components/Rank/Rank.js";
import Particles from "react-particles-js";
import "./App.css";

const app = new Clarifai.App({
  apiKey:"74b3307a099f4abfbc828bab31066e24",
});


const particlesOptions = {
  particles: {
        number: {
        value:30,
        density: {
          	enable: true,
            value_area: 800,
            
          }
      	}
    	}
    }
  
class App extends Component {
  constructor() {
     super();
     this.state={
        input:'',
        imageUrl:''
      }
    }
  onInputChange =(event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log("click")
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (err) {}
      );
  }
  render() {
    return (
      <div className="App">
      <Particles className="particles" 
         params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
         />
        <FaceRecognition imageUrl ={this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;

