#Radii-Fractal

Test code to consider the use of fractal circles as vector parameters for
game vehicle dynamics.

## Note!

All demos are in the test code; not the beta.


##Huh?

To be franc, the correct terminology is inert - so:

(My inspiration)  http://codepen.io/cwolves/pen/gykbc 

http://www.reddit.com/r/javascript/comments/1br9r1/recreated_a_fractal_gif_from_rwoahdude_in_html5/

So for now, lets dub it as radii-fractals - an easy terminology for the tool.


#About

This is a concept to determine the success of calculating vehicle vectors (and/or any quantitive value incluse of magnatitude, relative position...) from a set of 
carefully configured radii-fractals


##Huh?

Consider we have a game vehicle such as a car, a plane or a boat and I want to program driving dymanics affected by weight, centre of mass, force offset, angle of momentum, direction of attack (actioned by use input) and surface friction **to name a few**.

In other words, I wanted my vehicle to work like a real vehicle, inclusive of as many motion variables I could imagine.


##How would it work?

To put this in context, for a semi-complex driving game, I would like to apply dyamics such as:

* weight
* centre or gravity
* engine position
* steering input
* tyre grip

With my concept of using radii-fractals, each item listed - *a vector* - would
receive some user defined parameters and output fractal affected values.

Due to the fractal nature of the algorithm, each variable would affect it's child
value - in order. 


###How Does it work.

I'm sorry, it's gonna get a little physics class...

*Consider the first logical statement.*

* Car *weight* affects *centre of gravity*.
* Car *centre or gravity* does not affect *weight*

Therefore, using this in our code *Centre of gravity* is affected by the momentum of *weight*. When we change the weight, the centre of gravity would also change in relvative size. The same can be said for weight position, the centre of gravity
will also be moved in relative space.


#### Application in code.

To apply weight and centre of gravity to the radii fractal it's relatively easy (*accidental pun*).

CoG position is affected weight position.
CoG size is size is affect by wieght size.

    Weight
     |
     |-- Centre of Gravity.



##Shut up. Spreek Propery!

The user inputted paremeters would affect the vectors speed and radius, causing our vector to affect it's child vector's relative size and position.

Obviously I can crack out a 2D physics engine and set about writing my life away, which is a great - but hard. 

Instead, we can use logical, fractal based 