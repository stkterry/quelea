import React from "react";

class BoidsPureCanvas extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas id="boids-pure"
        width="800"
        height="500"
        ref={node =>
          node ? this.props.ctxRef(node.getContext('2d')) : null
        }
      />
    );
  }
}

export default BoidsPureCanvas;