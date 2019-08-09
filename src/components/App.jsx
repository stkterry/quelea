import React from 'react';
// import BoidsAnim from "./animations/boids/BoidsAnim";
import Nav from "./nav/Nav";
import Main from "./main/Main";

// import "../assets/libs/quadtree/test";

const pointer = require("../assets/public/images/pointer-white.png");
const rawFish = require("../assets/public/images/raw-fish.png");
const fishy = require("../assets/public/images/fishy.png");
const brownBird = require("../assets/public/images/brown-bird.png");
const blueBird = require("../assets/public/images/blue-bird.png");
const wutBee = require("../assets/public/images/wut-bee.png");
const langton = require("../assets/public/images/langton.png");
const cawBird = require("../assets/public/images/caw-bird.png");

const App = () => {
  return (
    <div>
      <img src={pointer} alt="pointerBoid" id="pointer" className="hidden" />
      <img src={rawFish} alt="rawFishBoid" id="raw-fish" className="hidden" />
      <img src={fishy} alt="rawFishBoid" id="fishy" className="hidden" />
      <img src={brownBird} alt="rawFishBoid" id="brownBird" className="hidden" />
      <img src={blueBird} alt="rawFishBoid" id="blueBird" className="hidden" />
      <img src={wutBee} alt="rawFishBoid" id="wutBee" className="hidden" />
      <img src={langton} alt="rawFishBoid" id="langton" className="hidden" />
      <img src={cawBird} alt="rawFishBoid" id="caw-bird" className="hidden" />
      <Nav />
      <Main />
    </div>
  );
}

export default App;


