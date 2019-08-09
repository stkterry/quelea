import React from "react";

import BoidsCanvas from "./BoidsCanvas";

class BoidsAnim extends React.Component {

  constructor(props) {
    super(props);
    this.state = { swarm: props.swarm }
    this.updateAnim = this.updateAnim.bind(this)
  }

  componentDidMount() {
    const { width, height } = this.getCanvasSize();
    this.state.swarm.newSwarm(1000, width, height);

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
    swarm.swarm(width, height);
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

