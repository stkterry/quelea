import React from "react";

import Canvas from "./Canvas";

class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    
    this.updateAnim = this.updateAnim.bind(this)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  updateAnim() {
    this.setState(prevState =>
      ({ angle: prevState.angle + 1 })
    );
    this.rAF = requestAnimationFrame(this.updateAnim);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <Canvas angle={this.state.angle} />
    )
  }
}

export default Animation;