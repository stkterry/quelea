import React from 'react';
// import BoidsAnim from "./animations/boids/BoidsAnim";
import Nav from "./nav/Nav";
import Main from "./main/Main";

const pointer = require("../assets/public/images/pointer_white.svg");

const App = () => {
  return (
    <div>
      <img src={pointer} alt="no" id="pointer" className="hidden" />
      <Nav />
      {/* <BoidsAnim /> */}
      <Main />
    </div>
  );
}

export default App;
