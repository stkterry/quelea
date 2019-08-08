import React from "react"

import BoidsAnim from "../animations/boids/BoidsAnim";
import Swarm from "../../assets/libs/swarm";


import alignment_icon from "../../assets/public/images/alignment.svg";
import cohesion_icon from "../../assets/public/images/cohesion.svg";
import separation_icon from "../../assets/public/images/separation.svg";
import velocity_icon from "../../assets/public/images/velocity.svg";
import acceleration_icon from "../../assets/public/images/acceleration.svg";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      swarm: new Swarm()
    }

    this.handleOverlaySlider = this.handleOverlaySlider.bind(this);
  }


  componentDidMount() {
    let boidOverlayBtn = document.getElementById("boid-overlay-btn");
    // let boidOverlay = document.getElementById("boid-overlay");
    boidOverlayBtn.addEventListener("mouseover", this.showOverlay, false);
    // boidOverlay.addEventListener("mouseover", this.keepOverlay, false);
    // boidOverlay.addEventListener("mouseleave", this.hideOverlay, false);
  }

  handleOverlaySlider(event, which) {
    event.preventDefault();
    this.setState({ 
      swarm: Object.assign(
        this.state.swarm, 
        {[which]: event.target.value }
      ) 
    });
  }

  showOverlay() {
    document.getElementById("boid-overlay").style.display = "flex";
  }
  keepOverlay() {
    // document.getElementById("boid-overlay").style.display = "flex";
  }
  hideOverlay() {
    setTimeout(() => {
      document.getElementById("boid-overlay").style.display = "none"
    }, 1000)
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

    let { alignmentR, cohesionR, separationR, 
      maxAF, maxCF, maxSF, 
      maxSpeed, maxAcc
    } = this.state.swarm;
    return (
      <div id="boid-overlay">
        <div className="boid-overlay-content">

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Perception Radii</h3>

            <div className="boid-overlay-slider selector-text">
            <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "alignmentR")}
                  type="number" min="0" max="250"
                  value={alignmentR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="alignmentRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Alignment</h3>
                <img src={alignment_icon} />
            </div>
              <input onChange={event => this.handleOverlaySlider(event, "alignmentR")} 
                type="range" min="0" max="250" 
                value={alignmentR} 
                className="sliderDef" id="alignmentR" 
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "cohesionR")}
                  type="number" min="0" max="250"
                  value={cohesionR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="cohesionRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Cohesion</h3>
                <img src={cohesion_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "cohesionR")} 
                type="range" min="0" max="250" 
                value={cohesionR} 
                className="sliderDef" id="cohesionR"  
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "separationR")}
                  type="number" min="0" max="250"
                  value={separationR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="separationRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Separation</h3>
                <img src={separation_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "separationR")}  
                type="range" min="0" max="250" 
                value={separationR}
                className="sliderDef" id="separationR"
              />
            </div>

          </div>

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Forces</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "maxAF")}
                  type="number" min="0" max="4" step="0.01"
                  value={maxAF}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="maxAFNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Alignment</h3>
                <img src={alignment_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxAF")} 
                type="range" min="0" max="4" step = "0.01"
                value={maxAF}
                className="sliderDef" id="maxAF"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "maxCF")}
                  type="number" min="0" max="4" step="0.01"
                  value={maxCF}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="maxCFNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Cohesion</h3>
                <img src={cohesion_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxCF")}
                type="range" min="0" max="4" step="0.01"
                value={maxCF}
                className="sliderDef" id="maxCF"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "maxSF")}
                  type="number" min="0" max="5" step="0.01"
                  value={maxSF}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="maxSFNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Separation</h3>
                <img src={separation_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxSF")}
                type="range" min="0" max="5" step="0.01"
                defaultValue={maxSF}
                className="sliderDef" id="maxSF"
              />
            </div>

          </div>

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Boid Physics</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "maxSpeed")}
                  type="number" min="0.5" max="10" step="0.01"
                  value={maxSpeed}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="maxSpeedNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Maximum Velocity</h3>
                <img src={velocity_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxSpeed")}
                type="range" min="0.5" max="10" step="0.01"
                value={maxSpeed}
                className="sliderDef" id="maxSpeed"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "maxAcc")}
                  type="number" min="0.01" max="1" step="0.01"
                  value={maxAcc}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="maxAccNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Maximum Acceleration</h3>
                <img src={acceleration_icon} />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxAcc")}
                type="range" min="0.01" max="1" step="0.01"
                value={maxAcc}
                className="sliderDef" id="maxAcc"
              />
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
            <BoidsAnim swarm={this.state.swarm} />
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