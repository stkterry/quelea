import React from 'react';
import BoidsAnim from "./animations/boids/BoidsAnim";

const pointer = require("../assets/public/images/pointer_white.svg");

const App = () => {
  return (
    <div>
      <img src={pointer} alt="no" id="pointer" className="hidden" />
      <h3>Good to go</h3>
      <BoidsAnim />
    </div>
  );
}

export default App;
