import React from "react";

class BoidsPureCanvas extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas id="boids-pure"
        width="1000"
        height="700"
        ref={node =>
          node ? this.props.ctxRef(node.getContext('2d')) : null
        }
      />
    );
  }
}

export default BoidsPureCanvas;