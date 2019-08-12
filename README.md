# Quelea | A Boids Simulation
[Live Link](https://quelea-boids.herokuapp.com/#/)
![Quelea Banner](./readme_imgs/banner.png)
<p align="center"><img src="./readme_imgs/six.png" alt="Base" width="400"></p>

## Overview
A simulation of boidian behavior exhibited by flocking, swarming, herding, swimming, or flying animals

## Features
Users can add/remove boids and obstacles, set sliders for the simulation variables, show/hide underlying structures and rules that guide the boids, and step through a boid's behavior.
<div display="flex" flex-direction="row">
  <img src="./readme_imgs/four.png" alt="about-showcase" width="32.5%">
  <img src="./readme_imgs/one.png" alt="slider-showcase" width="32.5%">
  <img src="./readme_imgs/two.png" alt="obstacle-showcase" width="32.5%">
  <img src="./readme_imgs/three.png" alt="cosmetics-showcase" width="32.5%">
  <img src="./readme_imgs/five.png" alt="tooltip-showcase" width="32.5%">
  <img src="./readme_imgs/eight.png" alt="experimental-density-showcase" width="32.5%">
</div>

## Intention
Flocking behavior is often poorly understood but nevertheless an interesting and valuable simulation, having uses in swarm automation and AI, other more complex data visualizations, Biology, computer graphics, video game development, etc.  A basic visual guide with references to each of the steps can be invaluable in reproducing the effect in any number of projects.

At then end of the interactive demonstration, users
should be able to understand the three primary guiding
forces behind boids: **seperation**, **alignment**, and **cohesion**, as well the variables and their effect on the three guiding forces.

## Technologies
* Javascript
* React
* HTML5 Canvas

### Purpose Built Libraries
* Euclidian Geometry
* Vectors
* Boidian/Particle Motion
* Physics
* Quadtree Algorithm

## Features, Implementation, Snippets
Excluding React, all features and code take full advantage of vanilla JavaScript
and the HTML5 Canvas.  All additionally libraries were purpose built for the demonstration.

### Vectors
The vector library is a simplified 2D vector class.  Most none-static methods
can be chained to together to perform sequences of operations while saving code space.

```js

import Vec from 

```

## To-do
* Add Falloff page - User controls that allow selecting different falloff curves
  for the various perception radii within the app
* Add the ability to select different backgrounds and display styles
* Add canvas resizing (currently fixed width/height)
