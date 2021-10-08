import React, { Component } from "react";
import Clarifai from 'clarifai';
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
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
  constructor(){
    super();
    this.state={
      input:''
    }
  }
  onInputChange =(event) =>{
    console.log(event.target.value);
  }

  onButtonSubmit =() =>{
    console.log("click")
   app.models
      .predict("a403429f2ddf4b49b307e318f00e528b","https://i.stack.imgur.com/H6O6W.jpg").then(
        function (response) {
          console.log(response);
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
        {/*
      <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
