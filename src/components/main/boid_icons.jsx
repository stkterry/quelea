
import React from "react";

class BoidIcons extends React.Component {
  render () {
    return (
      <div className="boid-overlay-perception-sliders">
        <h3 className="boid-overlay-slider-heading-text boid-overlay-text">Boid Icons</h3>

        <div id="boid-icon-box" onChange={this.handleOverlayIcon}>
          <label className="boid-icon-container">Pointer
                <input type="radio" name="boid-overlay-icon-select" value={"pointer"} />
            <img className="boid-icon-selection icon-raise" src={pointer} alt="boid icon pointer (pointer)" />
          </label>
          <label className="boid-icon-container">Raw Fish
                <input type="radio" name="boid-overlay-icon-select" value={"rawFish"} />
            <img className="boid-icon-selection icon-raise" src={rawFish} alt="boid icon raw-fish" />
          </label>
          <label className="boid-icon-container">Fishy
                <input type="radio" name="boid-overlay-icon-select" value={"fishy"} />
            <img className="boid-icon-selection icon-raise" src={fishy} alt="boid icon fishy" />
          </label>
          <label className="boid-icon-container">Caw! Caw!
                <input type="radio" name="boid-overlay-icon-select" value={"cawBird"} />
            <img className="boid-icon-selection icon-raise" src={cawBird} alt="boid icon caw-bird" />
          </label>
          <label className="boid-icon-container">Blue Bird
                <input type="radio" name="boid-overlay-icon-select" value={"blueBird"} />
            <img className="boid-icon-selection icon-raise" src={blueBird} alt="boid icon blue bird" />
          </label>
          <label className="boid-icon-container">Brownie
                <input type="radio" name="boid-overlay-icon-select" value={"brownBird"} />
            <img className="boid-icon-selection icon-raise" src={brownBird} alt="boid icon brown-bird" />
          </label>
          <label className="boid-icon-container">Langton
                <input type="radio" name="boid-overlay-icon-select" value={"langton"} />
            <img className="boid-icon-selection icon-raise" src={langton} alt="boid icon langton" />
          </label>
          <label className="boid-icon-container">Wut Bee
                <input type="radio" name="boid-overlay-icon-select" value={"wutBee"} />
            <img className="boid-icon-selection icon-raise" src={wutBee} alt="boid icon wut-bee" />
          </label>
        </div>

      </div>
    )
  }
}

export default BoidIcons