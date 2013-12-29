# Radii-Fractal

The algorithm is a concept designed to use fractal generated circles as variable input/output for 2D vector analysis.

To define it simply; a circle rotated within another circle. Each circle has variables to define a path of motion. The variables can be changed dynamically to affect a circles motion path. Each nested circle is affected by the parent - therefore a deep chain of variations can be read to calculate a resulting output.
This numerical output information can be applied to vectors of your own work.

## Breakdown

Lets breakdown some of the terminology

### A Radii

A radii is a set of Circles (or Cogs) applied to the algorithm to be used within the nested chain.

A radii can contain many Cogs. each Cog affects the children cogs and these changes can be ready back through methods.


### A Cog

A cog contains all the variables needed to compute the 2d position, along with callbacks to help read the values created.

# Getting Started

In your HTML you need the script and a canvas.

    <canvas id="rf_canvas" width='800px' height='700px'></canvas>
    <script type="text/javascript" src="RF.js"></script>

You're ready to code your Radii Fractal. In your javascript your need to generate a Radii:

    var radii = new Radii('rf_canvas');
    // name, size, speed.
    radii.cog('first', .9, 0.01) ;