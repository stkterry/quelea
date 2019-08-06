import React from "react";

import BoidsPureCanvas from "./BoidsPureCanvas";
import Boid from "../../../assets/libs/boid";

class BoidsCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveCtx = this.saveCtx.bind(this);
  }

  saveCtx(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  componentDidUpdate() {
    this.ctx.save();
    this.draw();
    this.ctx.restore();
  }

  draw() {
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.width, this.height);
    // this.props.swarm.drawSwarm(this.ctx, this.props.boids);
    this.props.swarm.drawSwarmAdv(this.ctx, this.props.boids);
  }

  render() {
    return (
      <div id="boids-canvas">
        <BoidsPureCanvas ctxRef={this.saveCtx} />
      </div>
    )
  }
}

export default BoidsCanvas;