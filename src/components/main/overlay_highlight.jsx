import React from 'react';

class OverlayHighlight extends React.Component {

  render() {

    switch (this.props.infoSelection) {
      case "info-alignment-radius":
        return (
          <div id="info-alignment-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Alignment Radius
                </h3>
                <p className="paragraph">
                  By increasing or decreasing the radius, you can control
                  the area around the boid that it will consider its neighbors.
                  Larger radii will decrease performance with larger populations.
                  <br></br>
                  <br></br>
                  A larger alignment radius will mean a boid aligns itself to a
                  larger group of boids, as that group encounters other boids, you
                  can expect that the group will tend to get bigger and the general
                  direction will change a little less over some distance.
                </p>
              </div>

            </div>
          </div>
        )

      case "info-cohesion-radius":
        return (
          <div id="info-cohesion-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Cohesion Radius
            </h3>
                <p className="paragraph">
                  By increasing or decreasing the radius, you can control
                  the area around the boid that it will consider its neighbors.
                  Larger radii will decrease performance with larger populations.

                  <br></br>
                  <br></br>
                  A larger cohesion radius will mean a boid finds the average of
                  a larger group of other boids and gravitates towards it, this
                  tends to congregate larger groups of boids but can also increase
                  spliting as two groups pass near each other.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-separation-radius":
        return (
          <div id="info-separation-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Separation Radius
            </h3>
                <p className="paragraph">
                  By increasing or decreasing the radius, you can control
                  the area around the boid that it will consider its neighbors.
                  Larger radii will decrease performance with larger populations.
                  <br></br>
                  <br></br>
                  A larger separation radius will force the boids to fan out over
                  a larger area and much more often split and segment as they move
                  and encounter other groups.  A smaller separation radius practically
                  forces boids on top of one another and creates more cyclic behavior.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-alignment-force":
        return (
          <div id="info-separation-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Alignment Force
            </h3>
                <p className="paragraph">
                  This force will increase or decrease the impact of the alignment
                  stage.  Over emphasising it can cause large groups to move in perfect
                  parallel as the alignment force will overcome the other two forces.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-cohesion-force":
        return (
          <div id="info-cohesion-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Cohesion Force
            </h3>
                <p className="paragraph">
                  Increasing this force will collapse groups of boids into a much
                  smaller size, decreasing their effect on other near boid clusters
                  but also completely collapsing the boids onto one another as the
                  force becomes too great to be balanced by other forces.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-separation-force":
        return (
          <div id="info-separation-radius" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Separation Force
            </h3>
                <p className="paragraph">
                  Increasing this force push all boids away from one another, very
                  rapidly resulting in jittering motion as the boids bounce into
                  each other's radius of influence.  Too much and you can create
                  what looks like Brownian motion.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-maximum-velocity":
        return (
          <div id="info-maximum-velocity" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Maximum Velocity
            </h3>
                <p className="paragraph">
                  You can adjust the maximum velocity of the boids with this slider.
                  By slowing the boids down, the acceleration force of the the three
                  boid behaviors will have a greater impact relatively speaking, but the boids
                  will of course be moving much more slowly.
                  <br></br>
                  Increasing the velocity will overpower the acceleration forces,
                  meaning swarms of boids will crash through each other, barely affected
                  or slowed down by the acceleration forces from their behaviors.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-maximum-acceleration":
        return (
          <div id="info-maximum-acceleration" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Maximum Accleration
            </h3>
                <p className="paragraph">
                  This is a control for the overall level of effect for any of the
                  behavioral acceleration forces.  Its effect is somewhat subtle, actually,
                  but you can see it amongst individual boids as the interact with
                  each other, resulting in more fluid, spongy motion when decreased, or by increasing it,
                  almost like the boids are hitting invisible force fields as they collide.
            </p>
              </div>
            </div>
          </div>
        )

      case "info-population-size":
        return (
          <div id="info-maximum-acceleration" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Population
            </h3>
                <p className="paragraph">
                  This adjusts the total maximum population.  Larger values
                  will let you see more complex and interesting patterns but,
                  take care to note, larger values can have a noticable performance
                  impact on your browser/computer.

            </p>
              </div>
            </div>
          </div>
        )

      case "info-boid-icon-size":
        return (
          <div id="info-maximum-acceleration" className="overlay-info-page">
            <div className="boid-overlay-content">
              <div className="boid-overlay-perception-sliders">
                <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
                  Population
            </h3>
                <p className="paragraph">
                  This is a cosmetic change, you can scale up each boid's icon
                  with this slider.  Go nuts, it has no performance impact.
            </p>
              </div>
            </div>
          </div>
        )

      default:
        return <></>
    }
  }

}


export default OverlayHighlight;