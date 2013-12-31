# Radii-Fractal

The algorithm is a concept designed to use fractal generated circles as variable input/output for 2D vector analysis.

To define it simply; a circle rotated within another circle. Each circle has variables to define a path of motion. The variables can be changed dynamically to affect a circles motion path. Each nested circle is affected by the parent - therefore a deep chain of variations can be read to calculate a resulting output.
This numerical output information can be applied to vectors of your own work.

## Breakdown

Lets breakdown some of the terminology

Configuration options are available at the Global level

    // How many segments of a cog (circle) to draw
    RF.config('arcSize', 360) // Degree (0 - 260)
    // how large relative to a parent
    RF.config('radius', .9) // default radius (0 - 1)
    // how fast.
    RF.config('speed', .9) // default radius (0 >)


### A Radii

A radii is a set of Circles (or Cogs) applied to the algorithm to be used within the nested chain.

A radii can contain many Cogs. each Cog affects the children cogs and these changes can be read back through methods.


### A Cog

A cog contains all the variables needed to compute the 2d position, along with callbacks to help read the values created.

### facts

+ A cog will complete one revolution at the speed as a parent cog, regardless of size

    radii.cog('first', .9, 0.01);
    radii.cog('second', .1, -0.01);
    // Both cogs will meet revolutions

# Getting Started

In your HTML you need the script and a canvas.

    <canvas id="rf_canvas" width='800px' height='700px'></canvas>
    <script type="text/javascript" src="RF.js"></script>

You're ready to code your Radii Fractal. In your javascript your need to generate a Radii:

    var radii = new Radii('rf_canvas');
    // name, size, speed.
    radii.cog('first', .9, 0.01) ;