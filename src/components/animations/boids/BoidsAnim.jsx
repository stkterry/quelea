import React from "react";

import BoidsCanvas from "./BoidsCanvas";
import Swarm from "../../../assets/libs/swarm";

class BoidsAnim extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      swarm: new Swarm()
    }
    this.updateAnim = this.updateAnim.bind(this)
  }

  componentDidMount() {
    const { width, height } = this.getCanvasSize();
    this.state.swarm.newSwarm(100, width, height);

    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  getCanvasSize() {
    const ctx = document.getElementById("boids-pure");
    return {width: ctx.offsetWidth, height: ctx.offsetHeight}
  }

  updateAnim() {
    const { width, height } = this.getCanvasSize();
    let { swarm } = this.state;

    this.rAF = requestAnimationFrame(this.updateAnim);
    swarm.swarm();
    swarm.swarmWrap(width, height);

    this.setState({ swarm: swarm });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <BoidsCanvas swarm={this.state.swarm} />
    )
  }
}

export default BoidsAnim;

