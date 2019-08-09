
import React from "react";


class Discuss extends React.Component {

  render() {
    return (
      <div id="main-discussion">

        <h1 id="whats-a-boid" className="paragraph-heading">What's A Boid?</h1>
        <div className="paragraph-group">
          <p className="paragraph">
            <p><span>
              Oh wow, dem's a lotta boids! - every New Yorker
            </span></p>
            <br/>
            Boid just means "bird-oid object", and refers to any number of
            creatures and critters that swarm or move about in large groups.
            Quelea, after which this site and project are named, are one of the 
            most impressive examples of swarming behavior, are among the world's
            most abundant birds, and can behave much like a swarm of locusts in
            large enough groups.
            
            <br />
            <br />

            Boids were first conceived and developed by <a href="https://en.wikipedia.org/wiki/Craig_Reynolds_(computer_graphics)">Craig Reynolds
            </a> in 1986 as a way of simulating the flocking behavior of birds and fish.
            It's an interesting example of emergent behavior, that is to say
            the complexity of the movemnt is the collective behavior of each individual.

            <br />
            <br/>
            You've likely seen examples of this in the real world or on televison,
            birds moving seemingly in unison without colliding.
            This site is a demonstration of that behavior and gives you 
            the opportunity to adjust nearly every setting and experience in real
            time the effects of those changes.

          </p>

          <p className="paragraph">
            In the next sections we'll first break-down the boids simulation into
            three principle steps, discuss each in a little more detail, and then
            discuss the settings available within the sim window!
          </p>
        </div>

        <h1 id="three-steps" className="paragraph-heading">Alignment, Separation, Cohesion</h1>
        <div className="paragraph-group">
          <p className="paragraph">
            <p><span>
              Alignment, separation, cohesion - words most commonly found in self-help books
            </span></p>
            <br/>
            As the title might suggest, boids can be broken into just three distinct
            behaviors.  What makes this even easier is that each step has a lot in
            common and yet is unrelated to the other behaviors!  Let's do a quick
            summary of each rule.
            <br />
            <br/>
            <p>
            <span>Alignment</span> - A boid's desire to align itself with its neighbors, and collectively move in that direction.
            </p>
            <p>
              <span>Separation</span> - The desire for a boid to move away from its
                immediate neighbors (though not too far).
            </p>
            <p>
              <span>Cohesion</span> - A boids desire to flock towards it's nearest
              neighbors. (but certainly not too close)
            </p>
            <br/>
            What counts as a neighbor?
            Imagine a circle centered on you, stretched out some distance
            away.  Whatever that distance, we consider neighbors to be
            any flockmates that have fallen within the boundary.
            We'll call that the <span>perception radius</span>, and there are
            three, one for each rule.
            <br />
            <br/>
            Not so bad, right?  Effectively each boid will look at its nearest
            neighbors within some radius or view distance, figure out the average
            spot it wants to be in for that behavior, and then add up the result
             and head that way.
            We can also multiply the result of each behavior by some secondary factor 
            or even apply a separate function to it that modifies its effectiveness.
            The key is that the resultant behavior for any boid is just the sum of the forces
            of each rule.
            <br/>
            <br/>
            Let's segue for just a moment and talk about vectors before we continue,
            they're the thing driving our boid's behaviors.  In words that would
            upset physicists and mathmaticians everywhere, a vector is just
            a thing in space, pointing somewhere else in space.  If I were to point
            at a tree in my yard, you could say that my outstretched arm were a vector,
            and its magnitude or length was just the length of my arm.
            <br />
            <br/>
            It's a terrible analogy but it gets the point across.  We can also describe
            forces as vectors: velocity is how fast you're going in a particular direction,
            acceleration is how rapidly you're changing speed in said direction, etc.

          </p>

          <p className="paragraph">
            <p><span>
              What do you mean I need an alignment!?  How much is that gonna cost me? - Average P. Joe
            </span></p>
            <br/>
            With alignment, we take a look at our neighbors, ask them how fast they're
            going, and in what direction.  That is, we add up each of their velocity vectors.
            <br/>
            That's it.
            <br/>
            Just doing that gives us the average direction we want to go.
            By dividing that sum vector by the number of neighbors we get the average
            velocity!  Step one done.  Easier than actually aligning your tires.
            <br/>

            
          </p>

          <p className="paragraph">
            <p><span>
              Please come home soon, please come home soon, please... - your dog. right. now.
            </span></p>
            <br />
            With alignment, we take a look at our neighbors, ask them how fast they're
            going, and in what direction.  That is, we add up each of their velocity vectors.
            <br />
            That's it.
            <br />
            Just doing that gives us the average direction we want to go.
            By dividing that sum vector by the number of neighbors we get the average
            velocity!  Step one done.  Easier than actually aligning your tires.
            <br />

          </p>

          <p className="paragraph">
            <p><span>
              That thing water does! - you in your introductory science course taking a test you `definitely` studied for
            </span></p>
            <br />
            With alignment, we take a look at our neighbors, ask them how fast they're
            going, and in what direction.  That is, we add up each of their velocity vectors.
            <br />
            That's it.
            <br />
            Just doing that gives us the average direction we want to go.
            By dividing that sum vector by the number of neighbors we get the average
            velocity!  Step one done.  Easier than actually aligning your tires.
            <br />

          </p>
        </div>
      </div>
    )
  }
}

export default Discuss;