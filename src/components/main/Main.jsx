import React from "react"

import BoidsAnim from "../animations/boids/BoidsAnim";
import OverlayInfo from "./overlay_info";

import Swarm from "../../assets/libs/swarm";

import alignment_icon from "../../assets/public/images/alignment.svg";
import cohesion_icon from "../../assets/public/images/cohesion.svg";
import separation_icon from "../../assets/public/images/separation.svg";
import velocity_icon from "../../assets/public/images/velocity.svg";
import acceleration_icon from "../../assets/public/images/acceleration.svg";

import pointer from "../../assets/public/images/pointer-white.png";
import rawFish from "../../assets/public/images/raw-fish.png";
import fishy from "../../assets/public/images/fishy.png";
import brownBird from "../../assets/public/images/brown-bird.png";
import blueBird from "../../assets/public/images/blue-bird.png";
import wutBee from "../../assets/public/images/wut-bee.png";
import langton from "../../assets/public/images/langton.png";
import cawBird from "../../assets/public/images/caw-bird.png";

const showNone = {
  showPrinciple: false,
  showSwarm: false,
  showAbout: false
};


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      swarm: new Swarm(),
      showPrinciple: false,
      showSwarm: false,
      showAbout: false,
      boidIcons: {}
    }

    this.handleOverlaySlider = this.handleOverlaySlider.bind(this);
    this.handleOverlayIcon = this.handleOverlayIcon.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
  }

  componentDidMount() {
    this.boidIcons = {
      pointer: document.getElementById("pointer"),
      rawFish: document.getElementById("raw-fish"),
      fishy: document.getElementById("fishy"),
      brownBird: document.getElementById("brownBird"),
      blueBird: document.getElementById("blueBird"),
      wutBee: document.getElementById("wutBee"),
      langton: document.getElementById("langton"),
      cawBird: document.getElementById("caw-bird"),
    }
    this.setState({
      swarm: Object.assign(
        this.state.swarm,
        { boidIcon: this.boidIcons.pointer }
      )
    })
  }
  handleOverlayIcon(event) {
    this.setState({
      swarm: Object.assign(
        this.state.swarm,
        { boidIcon: this.boidIcons[event.target.value] }
      )
    });
  }

  handleOverlaySlider(event, which) {
    event.preventDefault();
    event.persist();
    // let { max = parseInt(max), min = parseInt(min), value } = event.target;
    // let val;
    // if (max < value) val = max;
    // else if (min > value) val = min

    this.setState({
      swarm: Object.assign(
        this.state.swarm, 
        { [which]: event.target.value }
        ) 
      });
    
    // this.setState(prevState => {
    //   let swarm = {...prevState.swarm};
    //   swarm[which] = event.target.value;
    //   return { swarm };
    // })
  }

  showOverlay(event, which) {
    event.preventDefault();
    this.setState(Object.assign({}, this.state, showNone));
    this.setState({ [which]: true })
  }
  hideOverlay(event) {
    event.preventDefault();
    setTimeout(() => {
      this.setState(showNone)
    }, 250)
  }

  // Show/hide the overlay ----------------------
  overlayDis() {
    return (<>
      <nav id="overlayBtns">
        {this.aboutBtn()}
        {this.principleBtn()}
        {this.falloffBtn()}
        {this.swarmBtn()}
      </nav>
      {
        this.state.showPrinciple ? (
          this.renderPrinciple()
        ) : null
      }
      {
        this.state.showSwarm ? (
          this.renderSwarm()
        ) : null
      }

      {
        this.state.showAbout ? (
          <OverlayInfo hideOverlay={this.hideOverlay}/>
        ) : null
      }
    </>)
  }
  principleBtn() {
    return (
      <button
        id="boid-overlay-principle-btn"
        className="boid-overlay-btn"
        onMouseEnter={event => this.showOverlay(event, "showPrinciple")}
      >
        <i className="fas fa-sliders-h" />
      </button>
    )
  }
  falloffBtn() {
    return (
      <button
        id="boid-overlay-falloff-btn"
        className="boid-overlay-btn"
        onMouseEnter={event => this.showOverlay(event, "showSwarm")}
      >
        <i className="fas fa-chart-area"></i>
      </button>
    )
  }
  swarmBtn() {
    return (
      <button
        id="boid-overlay-swarm-btn"
        className="boid-overlay-btn"
        onMouseEnter={event => this.showOverlay(event, "showSwarm")}
      >
        <i className="fas fa-cogs" />
      </button>
    )
  }
  aboutBtn() {
    return (
      <button
        id="info-overlay-about"
        className="boid-overlay-btn"
        onMouseEnter={event => this.showOverlay(event, "showAbout")}
      >
        <i class="far fa-question-circle"></i>
      </button>
    ) 
  }


  renderPrinciple() {

    let { alignmentR, cohesionR, separationR, 
      maxAF, maxCF, maxSF, 
      maxSpeed, maxAcc
    } = this.state.swarm;
    return (
      <div id="boid-principle-overlay" className="boid-overlay-page" onMouseLeave={this.hideOverlay}>
        <div className="boid-overlay-content">

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Perception Radii</h3>

            <div className="boid-overlay-slider selector-text">
            <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "alignmentR")}
                  type="number" min="0" max="150"
                  value={alignmentR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="alignmentRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Alignment</h3>
                <img src={alignment_icon} alt="alignment radius" />
            </div>
              <input onChange={event => this.handleOverlaySlider(event, "alignmentR")} 
                type="range" min="0" max="150" 
                value={alignmentR} 
                className="sliderDef" id="alignmentR" 
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "cohesionR")}
                  type="number" min="0" max="150"
                  value={cohesionR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="cohesionRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Cohesion</h3>
                <img src={cohesion_icon} alt="cohesion radius" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "cohesionR")} 
                type="range" min="0" max="150" 
                value={cohesionR} 
                className="sliderDef" id="cohesionR"  
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "separationR")}
                  type="number" min="0" max="150"
                  value={separationR}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="separationRNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Separation</h3>
                <img src={separation_icon} alt="separation radius" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "separationR")}  
                type="range" min="0" max="150" 
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
                <img src={alignment_icon} alt="max alignment force" />
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
                <img src={cohesion_icon} alt="max cohesion force" />
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
                <img src={separation_icon} alt="max separation force" />
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
                <img src={velocity_icon} alt="max velocity" />
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
                <img src={acceleration_icon} alt="maximum acceleration" />
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
  renderSwarm() {

    let { size, boidIconSize
    } = this.state.swarm;
    return (
      <div id="boid-swarm-overlay" className="boid-overlay-page" onMouseLeave={this.hideOverlay}>
        <div className="boid-overlay-content">

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Swarm</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlaySlider(event, "size")}
                  type="number" min="0" max="1500" step="1"
                  value={size}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="swarm-sizeNum"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Population</h3>
                <img src={alignment_icon} alt = "swarm population size" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "size")}
                type="range" min="1" max="1500" step="1"
                value={size}
                className="sliderDef" id="swarm-size"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <input onChange={event => this.handleOverlayIcon(event, "boidIconSize")}
                  type="number" min="0" max="100" step="1"
                  value={boidIconSize}
                  className="boid-overlay-text boid-overlay-slider-val boid-overlay-num" id="swarm-IconSize"
                />
                <h3 className="boid-overlay-slider-text boid-overlay-text">Physical Size</h3>
                <img src={alignment_icon} alt="boid icon size" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "boidIconSize")}
                type="range" min="4" max="24" step="1"
                value={boidIconSize}
                className="sliderDef" id="swarm-size"
              />
            </div>

          </div>

          {
            this.boidIcons ? (


              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Boid Icons</h3>

                <div id="boid-icon-box" onChange={this.handleOverlayIcon}>
                  <label className="boid-icon-container">Pointer
                <input type="radio" name="boid-overlay-icon-select" value={"pointer"} />
                    <img className="boid-icon-selection icon-raise" src={pointer} alt="boid icon pointer (pointer)" />
                  </label>
                  <label className="boid-icon-container">Raw Fish
                <input type="radio" name="boid-overlay-icon-select" value={"rawFish"} />
                    <img className="boid-icon-selection icon-raise" src={rawFish} alt="boid icon raw-fish" />
                  </label>
                  <label className="boid-icon-container">Fishy
                <input type="radio" name="boid-overlay-icon-select" value={"fishy"} />
                    <img className="boid-icon-selection icon-raise" src={fishy} alt="boid icon fishy" />
                  </label>
                  <label className="boid-icon-container">Caw! Caw!
                <input type="radio" name="boid-overlay-icon-select" value={"cawBird"} />
                    <img className="boid-icon-selection icon-raise" src={cawBird} alt="boid icon caw-bird" />
                  </label>
                  <label className="boid-icon-container">Blue Bird
                <input type="radio" name="boid-overlay-icon-select" value={"blueBird"} />
                    <img className="boid-icon-selection icon-raise" src={blueBird} alt="boid icon blue bird" />
                  </label>
                  <label className="boid-icon-container">Brownie
                <input type="radio" name="boid-overlay-icon-select" value={"brownBird"} />
                    <img className="boid-icon-selection icon-raise" src={brownBird} alt="boid icon brown-bird" />
                  </label>
                  <label className="boid-icon-container">Langton
                <input type="radio" name="boid-overlay-icon-select" value={"langton"} />
                    <img className="boid-icon-selection icon-raise" src={langton} alt="boid icon langton" />
                  </label>
                  <label className="boid-icon-container">Wut Bee
                <input type="radio" name="boid-overlay-icon-select" value={"wutBee"} />
                    <img className="boid-icon-selection icon-raise" src={wutBee} alt="boid icon wut-bee" />
                  </label>
                </div>

              </div>
            ) : null
          }

        </div>
      </div>
    )
  }
  // ----------------------------

  render() {
    // console.log('here')
    return (
      <div id="main">
        <div id="main-boids-anim">

          {this.overlayDis()}

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