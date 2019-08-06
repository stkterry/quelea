import React from "react";

class PureCanvas extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        width="300"
        height="300"
        ref={node =>
          node ? this.props.ctxRef(node.getContext('2d')) : null
        }
      />
    );
  }
}

export default PureCanvas;