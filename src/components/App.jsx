import React from 'react';
// import BoidsAnim from "./animations/boids/BoidsAnim";
import Nav from "./nav/Nav";
import Main from "./main/Main";

const pointer = require("../assets/public/images/pointer-white.svg");
const rawFish = require("../assets/public/images/raw-fish.svg");

const App = () => {
  return (
    <div>
      <img src={pointer} alt="pointerBoid" id="pointer" className="hidden" />
      <img src={rawFish} alt="rawFishBoid" id="raw-fish" className="hidden" />
      <Nav />
      {/* <BoidsAnim /> */}
      <Main />
    </div>
  );
}

export default App;
