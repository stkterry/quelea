import React from "react"

import BoidsAnim from "../animations/boids/BoidsAnim";
import OverlayInfo from "./overlay_info";
import OverlayHighlight from "./overlay_highlight";

import Swarm from "../../assets/libs/swarm";

import alignment_icon from "../../assets/public/images/alignment.svg";
import cohesion_icon from "../../assets/public/images/cohesion.svg";
import separation_icon from "../../assets/public/images/separation.svg";
import velocity_icon from "../../assets/public/images/velocity.svg";
import acceleration_icon from "../../assets/public/images/acceleration.svg";
import avoidance_icon from "../../assets/public/images/avoidance.svg";
import dot_arrow_icon from "../../assets/public/images/dot-arrow.svg";
import dots_menu_icon from "../../assets/public/images/dots-menu.svg";

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
  showAbout: false,
  showObstacle: false,
  showFalloff: false,
  showOverlayHighlight: ""
};


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      swarm: new Swarm(),
      showPrinciple: false,
      showSwarm: false,
      showAbout: false,
      showObstacle: false,
      showFalloff: false,
      boidIcons: {},
      showOverlayHighlight: ""
    }

    this.handleOverlaySlider = this.handleOverlaySlider.bind(this);
    this.handleOverlayIcon = this.handleOverlayIcon.bind(this);
    this.showOverlayHighlight = this.showOverlayHighlight.bind(this);
    this.hideOverlayHighlight = this.hideOverlayHighlight.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.addObstacle = this.addObstacle.bind(this);
    this.removeLastObstacle = this.removeLastObstacle.bind(this);
    this.removeAllObstacles = this.removeAllObstacles.bind(this);
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

    document.addEventListener("click", this.addObstacle);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.addObstacle);
  }

  addObstacle(event) {
    if (event.target.id === "main-boids-anim") {
      let ele = document.getElementById("main-boids-anim");

      let { swarm } = this.state;
      console.log(this.state.swarm)
      swarm.newObstacle(event.pageX - ele.offsetLeft, event.pageY - ele.offsetTop);
      this.setState({
        swarm: Object.assign(this.state.swarm, swarm)
      });
    }
  }
  removeLastObstacle(event) {
    event.preventDefault();
    let { swarm } = this.state;
    swarm.deleteLastObstacle();
    this.setState({
      swarm: Object.assign(this.state.swarm, swarm)
    })
  }
  removeAllObstacles(event) {
    event.preventDefault();
    let { swarm } = this.state;
    swarm.deleteAllObstacles();
    this.setState({
      swarm: Object.assign(this.state.swarm, swarm)
    });
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
    this.setState({
      swarm: Object.assign(
        this.state.swarm,
        { [which]: parseFloat(event.target.value) }
      )
    });
  }

  showOverlayHighlight(event, which) {
    event.preventDefault();
    this.setState({
      showOverlayHighlight: which
    })
  }
  hideOverlayHighlight(event) {
    event.preventDefault();
    this.setState({
      showOverlayHighlight: ""
    })
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
        {this.obstaclesBtn()}
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
        this.state.showFalloff ? (
          this.renderFalloff()
        ) : null
      }

      {
        this.state.showAbout ? (
          <OverlayInfo hideOverlay={this.hideOverlay} />
        ) : null
      }

      {
        this.state.showObstacle ? (
          this.renderObstacle()
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
        onMouseEnter={event => this.showOverlay(event, "showFalloff")}
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
  obstaclesBtn() {
    return (
      <button
        id="boid-overlay-obstacles-btn"
        className="boid-overlay-btn"
        onMouseEnter={event => this.showOverlay(event, "showObstacle")}
      >
        <i className="fas fa-tree" />
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
        <i className="far fa-question-circle"></i>
      </button>
    )
  }
  renderFalloff() {

    return (
      <div id="boid-obstacles-overlay" className="boid-overlay-page" onMouseLeave={this.hideOverlay}>
        <div className="boid-overlay-content">
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              Falloff Section Coming Soon!
            </h3>
            <p className="paragraph">
              This is a work in progress.  When completed, users will
              be able to adjust the falloff effect of the perception radii.
              You'll be able to select a function which modifies the intensity
              of the effect as a factor of distance, per boid in a boid's neighbors.
            </p>
          </div>
        </div>
      </div>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{alignmentR}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-alignment-radius")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Alignment
                </h3>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{cohesionR}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-cohesion-radius")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Cohesion
                </h3>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{separationR}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-separation-radius")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Separation
                </h3>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxAF}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-alignment-force")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Alignment</h3>
                <img src={alignment_icon} alt="max alignment force" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxAF")}
                type="range" min="0" max="1" step="0.01"
                value={maxAF}
                className="sliderDef" id="maxAF"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxCF}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-cohesion-force")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Cohesion</h3>
                <img src={cohesion_icon} alt="max cohesion force" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxCF")}
                type="range" min="0" max="1" step="0.01"
                value={maxCF}
                className="sliderDef" id="maxCF"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxSF}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-separation-force")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Separation</h3>
                <img src={separation_icon} alt="max separation force" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxSF")}
                type="range" min="0" max="1" step="0.01"
                defaultValue={maxSF}
                className="sliderDef" id="maxSF"
              />
            </div>

          </div>

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Boid Physics</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxSpeed}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-maximum-velocity")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Maximum Velocity</h3>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxAcc}</h3>

                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-maximum-acceleration")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Maximum Acceleration</h3>
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
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{size}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-population-size")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Population</h3>
                <img src={dots_menu_icon} alt="swarm population size" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "size")}
                type="range" min="1" max="1500" step="1"
                value={size}
                className="sliderDef" id="swarm-size"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{boidIconSize}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-boid-icon-size")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Physical Size</h3>
                <img src={dot_arrow_icon} alt="boid icon size" />
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
  renderObstacle() {

    let { avoidanceR, maxAvF } = this.state.swarm;
    return (
      <div id="boid-obstacles-overlay" className="boid-overlay-page" onMouseLeave={this.hideOverlay}>
        <div className="boid-overlay-content">

          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Obstacles</h3>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{avoidanceR}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-avoidance-radius")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Avoidance Radius</h3>
                <img src={avoidance_icon} alt="avoidance radius icon" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "avoidanceR")}
                type="range" min="0" max="150" step="1"
                value={avoidanceR}
                className="sliderDef" id="avoidance-radius"
              />
            </div>

            <div className="boid-overlay-slider selector-text">
              <div className="boid-overlay-slider-presentation">
                <h3 className="boid-overlay-text boid-overlay-slider-val boid-overlay-num">{maxAvF}</h3>
                <h3 className="boid-overlay-slider-text boid-overlay-text"
                  onMouseEnter={event => this.showOverlayHighlight(event, "info-avoidance-max-force")}
                  onMouseLeave={this.hideOverlayHighlight}
                >Avoidance Force</h3>
                <img src={avoidance_icon} alt="avoidance radius force" />
              </div>
              <input onChange={event => this.handleOverlaySlider(event, "maxAvF")}
                type="range" min="0" max="4" step="0.01"
                value={maxAvF}
                className="sliderDef" id="avoidance-radius"
              />
            </div>

            <div className="boid-overlay-perception-sliders boid-avoidance-btns">

              <button className="boid-avoidance-btn"
                onClick={this.removeAllObstacles}              
              >
                <div>
                  <h3>Delete All</h3>
                  <i className="fas fa-trash"></i>
                </div>
              </button>
              <button className="boid-avoidance-btn"
                onClick={this.removeLastObstacle}
              >
                <div>
                  <h3>Delete Last</h3>
                  <i className="fas fa-backspace"></i>
                </div>
              </button>

            </div>

          </div>
        </div>
      </div>
    )
  }

  // ----------------------------

  render() {
    return (
      <div id="main">
        <div id="main-boids-anim">

          {this.overlayDis()}
          <OverlayHighlight infoSelection={this.state.showOverlayHighlight} />

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