import React from "react";

import BoidsPureCanvas from "./BoidsPureCanvas";

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
    this.ctx.fillStyle = "#051C24"
    this.ctx.fillRect(0, 0, this.width, this.height);
    switch(this.props.swarm.drawType) {
      case "drawSwarmAdv":
        this.props.swarm.drawSwarmAdv(this.ctx);
        break;
      case "drawSwarmDensity":
        this.props.swarm.drawSwarmDensity(this.ctx);
        break;
      default:
        this.props.swarm.drawSwarmAdv(this.ctx);
    }
    this.props.swarm.drawObstacles(this.ctx);
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