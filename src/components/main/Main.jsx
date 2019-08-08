import React from "react"
// import Boid from "../../assets/libs/boid";
import BoidsAnim from "../animations/boids/BoidsAnim";

import alignment_icon from "../../assets/public/images/alignment.svg";
import cohesion_icon from "../../assets/public/images/cohesion.svg";
import separation_icon from "../../assets/public/images/separation.svg";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      a:true
    }

  }

  handleOverlay() {
    console.log("here")
  }

  overlayBtn() {
    return (
      <button
        id="boid-overlay-btn"
        onMouseOver={this.handleOverlay}
      >
        <i className="fas fa-cogs" />
      </button>
    )
  }

  renderOverlay() {
    return (
      <div id="boid-overlay">
        <div className="boid-overlay-content">

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Perception Radii</h3>

            <div className="boid-overlay-slider selector-text">
            <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Alignment</h3>
                <img src={alignment_icon} />
            </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="alignmentR" />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Cohesion</h3>
                <img src={cohesion_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="cohesionR" />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Separation</h3>
                <img src={separation_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="separationR" />
            </div>

          </div>

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Forces</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Alignment</h3>
                <img src={alignment_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="maxAF" />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Cohesion</h3>
                <img src={cohesion_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="maxCF" />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Separation</h3>
                <img src={separation_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="maxSF" />
            </div>

          </div>

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Boid Physics</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Maximum Velocity</h3>
                <img src={alignment_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="maxSpeed" />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val">Num</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text">Maximum Acceleration</h3>
                <img src={cohesion_icon} />
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="sliderDef" id="maxAcc" />
            </div>

          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="main">
        <div id="main-boids-anim">

            {this.overlayBtn()}
            {this.renderOverlay()}
          <div className="main-edge-container">
            <div className="main-cover"></div>
            <BoidsAnim />
          </div>

          <div className="mam-about">
            <h3>Created By</h3>
            <h3 className="main-about-me">Steven Terry</h3>
          </div>
          <h3 className="main-about-me">
            stkterry@gmail.com
          </h3>
        </div>
      </div>
    )
  }


}

export default Main;