import React from "react"
import Boid from "../../assets/libs/boid";
import BoidsAnim from "../animations/boids/BoidsAnim";

class Main extends React.Component {

  constructor(props) {
    super(props);

    // this.state={
    //   Boid: require("../../assets/libs/boid").default
    // }


  }


  render() {
    return (
      <div id="main">
        <BoidsAnim />
      </div>
    )
  }


}

export default Main;