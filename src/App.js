import React, { Component } from "react";
import Clarifai from 'clarifai';
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import SignIn from "./Components/SignIn/SignIn.js";
import Register from "./Components/Register/Register.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Rank from "./Components/Rank/Rank.js";
import Particles from "react-particles-js";
import "./App.css";

const app = new Clarifai.App({
  apiKey:"74b3307a099f4abfbc828bab31066e24",
});
const initialState = {
        input:'',
        imageUrl:'',
        box:{},
        route:'signin',
        isSignedIn:false,
        user:{
          id: "",
          name: "",
          email: "",
          entries: 0,
          joined: '',
        }
}

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
     this.state=initalState
         
    }


  // componentDidMount(){
  //   fetch('http://localhost:3001/')
  //   .then(response => response.json())
  //   .then(console.log)
  //}
  loadUser = (data) => {
    this.setState({user:{
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          }
    })
  }

  calculateFaceLocation = (data) => {
       const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);
       return {
         leftcol:clarifaiFace.left_col * width,
         toprow:clarifaiFace.top_row * height,
         rightcol:width - (clarifaiFace.right_col * width),
         bottomrow:height - (clarifaiFace.bottom_row * height)
       }
  }
  displayFaceBox = (box) => {
    this.setState({box:box});
  }
  onInputChange =(event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image',{
             method:'put',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({
                id:this.state.user.id,
                
              })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));
           
  }

  onRouteChange =(route) => {
    if(route==="signout"){
      this.setState({isSignedIn:false})
    } else if(route==="home") {
      this.setState(initalState)
    }
      this.setState( {route:route});
  }
  
  render() {
    const {isSignedIn, route, imageUrl, box} = this.state ;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === "home" 
          ? <div>
              <Logo />
              <Rank name ={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                box={box}
                imageUrl={imageUrl}
              />
            </div>
          : (
              route === "signin" 
              ? <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser ={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;


