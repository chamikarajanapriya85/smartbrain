import React from "react";
import Tilt from "react-tilt";
import Brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br-2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3"> 
         <img alt="logo" src={Brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
