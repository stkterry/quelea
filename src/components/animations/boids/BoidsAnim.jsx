import React from "react";

import BoidsCanvas from "./BoidsCanvas";
import Boid from "../../../assets/libs/boid";
import Swarm from "../../../assets/libs/swarm";
import { Rand } from "../../../assets/libs/util";

class BoidsAnim extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      boids: [],
      swarm: new Swarm()
    }
    this.updateAnim = this.updateAnim.bind(this)
  }

  componentDidMount() {
    const { width, height } = this.getCanvasSize();
    const boids = [];
    for (let i = 0; i < 100; i++) {
      boids.push(new Boid({x: Rand(0, width), y: Rand(0, height)}));
    }
    this.setState({ boids: boids })
    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  getCanvasSize() {
    const ctx = document.getElementById("boids-pure");
    return {width: ctx.offsetWidth, height: ctx.offsetHeight}
  }

  updateAnim() {
    const { width, height } = this.getCanvasSize();
    let { boids, swarm } = this.state;

    this.rAF = requestAnimationFrame(this.updateAnim);
    swarm.swarm(boids);
    swarm.wrap(width, height, boids);

    this.setState({ boids: boids });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <div id="boids-anim">
        <div id="boids-anim-container">
          {/* <div className="check"></div> */}
          <BoidsCanvas swarm={this.state.swarm} boids={this.state.boids} />
        </div>
      </div>
    )
  }
}

export default BoidsAnim;