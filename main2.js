$(document).ready(function(){

});

var count = 1,
    vectors = [];

newVector = (function(p){
    var processing = p;

    return function(name){
        var v = new RadianVector(name, processing);
        var p = vectors.push(v) - 1;
        if(vectors[p-1]) {
            v.parent = vectors[p-1];
            vectors[p-1].child = v;
            v.r2 = vectors[p-1].radius;
        }
    }
})
// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
      // Override draw function, by default it will be called 60 times per second
    o = processing

    processing.setup  = function() {
        newVector(p)
        for (var i = 0; i < count; i++) {
        };
    }
    
      processing.draw = function() {
            // determine center and max clock arm length
            var centerX = processing.width / 2, 
                centerY = processing.height / 2;
            
            // erase background
            processing.background(240);
            processing.size(600, 600);
            calulateVectors.apply(processing);
            drawRadi.apply(this);

      };
}

var RadianVector = function(name, processing){
    var p = processing;
    return {
        child: function(c){
            if(c) {
                this._child = c;
            }
            return c;
        },
        name: name,
        radius: 250, 
        width: 500,
        height: 500,
        x: null,
        y: null,
        rotate: 0,
        speed: 50,
        size: function (v){
            this.width = this.height = v;
        },
        draw: function(){
            /*
            processing draw method
             */
            var r2 = this.radius * ( (this.parent)? this.parent.radius * .3: 1); // shrink each circle
            var r = Math.min( this.width, this.height ) / 2
            this.x =  p.width/2;
            this.y =  p.height/2;

            this.rotate += .1 * this.speed * 10;
            this.x += ( r - r2 ) * Math.cos( this.rotate );
            this.y += ( r - r2 ) * Math.sin( this.rotate );
            p.ellipseMode(p.CENTER);
            p.noFill();

            p.ellipse(this.x, this.y, this.width, this.height);
            //this.r2 += (this.clock*.1)
  ;
        }
    }
}

calulateVectors = function(){

}

drawRadi = function(processing){
    /*
    Draw a radius circle.
     */
    for (var i = 0; i < vectors.length; i++) {
        var c = vectors[i];
        c.draw(processing);
    }; 
}

var canvas = $("#circles")[0];
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
    newVector = newVector(p);

// p.exit(); to detach it