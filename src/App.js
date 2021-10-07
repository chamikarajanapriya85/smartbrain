import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import Particles from "react-particles-js";
import "./App.css";
const particlesOptions = {
  particles: {
        line_linked: {
        shadow: {
          	enable: true,
            color: "#3CA9D1",
            blur: 5
        	}
      	}
    	}
    }
  
class App extends Component {
  render() {
    return (
      <div className="App">
      <Particles 
         params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
      <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
