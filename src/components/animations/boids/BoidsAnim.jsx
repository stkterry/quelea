import React from "react";

import BoidsCanvas from "./BoidsCanvas";
import Swarm from "../../../assets/libs/swarm";

class BoidsAnim extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      boids: [],
      swarm: new Swarm(),
      gridWidth: 20
    }
    this.updateAnim = this.updateAnim.bind(this)
  }

  componentDidMount() {
    const { width, height } = this.getCanvasSize();
    this.setState({
      boids: this.state.swarm.newSwarm(500, width, height)
    })

    

    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  getCanvasSize() {
    const ctx = document.getElementById("boids-pure");
    return {width: ctx.offsetWidth, height: ctx.offsetHeight}
  }

  updateAnim() {
    const { width, height } = this.getCanvasSize();
    let { boids, swarm } = this.state;

    // boids = swarm.swarm2();
    swarm.swarm(boids);
    this.rAF = requestAnimationFrame(this.updateAnim);
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