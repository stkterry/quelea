import React from "react"



class OverlayInfo extends React.Component {


  render() {
    return (
      <div onMouseLeave={this.props.hideOverlay} id="overlay-info-main" className="overlay-info-about">
        <div className="boid-overlay-content">
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              What's a Boid? (Look at all dem boids!)
            </h3>
            <p className="paragraph">
              Boids are just 'bird-like objects' but really refer to any animal
              or insect that flocks or swarms.  A Boids simulation is just that, a
              graphical visualization of the swarm effect!
              <br></br>
              <br></br>
              This site was named after a bird famous for its flocking behaviors,
              the Quelea, and you should read more about them <a className="text-raise" href="https://en.wikipedia.org/wiki/Quelea">here</a> as well as the
              original developer of the boid algorithm, <a className="text-raise" href="http://www.red3d.com/cwr/">Craig Reynolds</a>.
            </p>
          </div>
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              How's it Work? (And who's driving the bus?)
            </h3>
            <p className="paragraph">
              Each boid has a set of just three behaviors it follows each time
              it moves. Those are <span>alignment</span>, <span>separation</span>, and <span>cohesion</span>.
              <br></br>
              On each step a boid makes a decision on where to go based on the positions of their neighbors,
              resulting in what's known as <a className="text-raise" href="https://en.wikipedia.org/wiki/Emergence">emergent behavior</a>.
              That is, the collective patterns they make together are not a property of any one boid, but in fact
              emerge from the chaos and random choices they make collectively.
              <br></br>
              <br></br>
            </p>
            <h2 className="section-heading">Alignment</h2>
            <p className="paragraph">
              In alignment, each boid looks at its neighbors and sums the vectors
              of each of their velocities, or direction and speed of travel.  From
              that the boid gets an average and multiplies it by some factor,
              adjusting the strength of it.  They then add that to themselves
              as an acceleration force, thereby shifting their speed and direction
              slightly more inline with that of their neighbors.
              <br></br>
              <br></br>
            </p>
            <h1 className="section-heading">Cohesion</h1>
            <p className="paragraph">
              In cohesion, a boid again considers their neighbors, but focuses
              on their average position, again adding up those vectors, multiplying
              by some factor, and then steering towards that center point.
              <br></br>
              <br></br>
            </p>
            <h1 className="section-heading">Separation</h1>
            <p className="paragraph">
              Separation is sort of the opposite of cohesion.  Each boid might
              want to move towards the center of their group, but they also need
              some space.  So they consider their neighbors' positions relative to
              it this time, and move towards the most empty space (and away from
              the absolutely nearest neighbors)
            </p>
          </div>
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              Avoidance (But you said just three behaviors!)
            </h3>
            <p className="paragraph">
              So yeah, the simulation is complete with just those three mechanics
              but we can make it a lot more fun by introducing an avoidance behavior
              for non-boidian obstacles.  Boids will always try to avoid obstacles
              and go around them or simply double back, but certain settings will
              have them careening into them.  Experiment a bit and see for yourself.
              <br></br>
              <br></br>
              Try clicking the screen and adding a few obstacles.  Check out the
              Avoidance tab on the right for a few more options.
              <br></br>
              <br></br>
            </p>
          </div>
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              And the simulation?
            </h3>
            <p className="paragraph">
              On the top right of the boids simulation you'll find a collection
              of nifty dropdown menus, each of which offers some adjustments
              to the behaviour of the swarm/flock and or cosmetic adjustments
              for your viewing pleasure.  Each setting has a name, and hovering
              over it will reveal some quick info/reminder on what it'll do.
              <br></br>
              <br></br>
              Have fun!
            </p>
          </div>
          <div className="boid-overlay-perception-sliders">
            <h3 className="boid-overlay-slider-heading-text boid-overlay-text">
              A Final Note on Implementation
            </h3>
            <p className="paragraph">
              Aside from this being a React application, there are no other libraries
              or dependencies.  Every library, model, or algorithm was created
              specifically for this app!  Let's very briefly discuss them.
              <br></br>
              <br></br>
              I created a small vector math lib that each of the boid model's uses
              to store and manipulate their vectors.  It's not a fully equipped physics
              engine, but it's more than enough for this simulation in its current form.
              <br></br>
              <br></br>
              You can guess that there's a Boid class but there's also a Swarm class.
              While the boid houses all of its own functionality necessary for movement,
              the Swarm keeps track of and updates the boids as a collection, as well
              as houses configuration data that can be manipulated through React's state.
              It makes possible all those lovely sliders and instant updates to the sim.
              <br></br>
              <br></br>
              Lastly, one of the biggest contributors to performance is a <a className="text-raise" href="https://en.wikipedia.org/wiki/Quadtree">Quadtree</a>.
              It allows the sim to query only those neighbors nearest to any one boid,
              and could be considered a demonstration in its own right.
              In the case of this simulation, if the population were set to its
              max at 1500 boids, the quadtree is able to reduce checks against 
              other boids from 2.25 million per frame to just under five thousand.
              <br></br>
              Incredible right?  Be sure to read up on the quadtree if you're unfamiliar.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default OverlayInfo;