
function arg(_a, ia, def, returnArray) {
    var v = null

    // if ia is an array, find the
    // first correct definition
    if (ia.constructor  == Array) { 
        for(var i=0; i<ia.length; i++) {
            if(_a[ia[i]] || _a[ia[i]] === false ){
                v = _a[ia[i]];
                break;
            }
        }
    }
    else {
        if(_a[ia] || _a[ia] === false ) v = _a[ia];
    }

    if( (v == null) && (def != undefined) ) {
        v = def
    }

    if(returnArray){
        return [v, ia[i]]
    }
    else
    {
        return v
    }

}


var vectors = 4,
	ready = false,
	radii = [],
	speeds = [],
	colors= [],
	toDraw = [],
	fractal = document.getElementById( 'fractal' ),
	circles = document.getElementById( 'circles' ),
	fractalContext = fractal.getContext( '2d' ),
	circleContext = circles.getContext( '2d' ),
	width = circles.width,
	height = circles.height,
	rotate = [  ],
	radiiClock =0,
	posRadClock = true,
	pX = 0,
	pY = 0;

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			window.setTimeout(callback, 1000 / 60);
			};
})();

(function animloop(){
	requestAnimFrame(animloop);
	render();
})();

changeRadii = function changeRadii(v){
	for (var i = 0; i < radii.length; i++) {	
		radii[i]= v
	};
}

function render(){
	var x = width  / 2,
		y = height / 2,
		r = Math.min( width, height ) / 2,
		r2;

	circleContext.lineWidth = 2;
	// clear the circles
	circleContext.clearRect( 0, 0, width, height );

	// draw one circle
	function drawCircle(i){
		circleContext.beginPath();
		circleContext.strokeStyle = colors[i]
		circleContext.arc( x, y, r, 0, 2 * Math.PI, false );
		circleContext.stroke();
	}

	//if(radiiClock > 400 || radiiClock < 0) posRadClock = !posRadClock;
	/*
	for (var i = 0; i < radii.length; i++) {	
		radii[i]= .980 + (.0001 * radiiClock/2)
	};

	(posRadClock)? radiiClock++: radiiClock--
	*/

	for( var i=0; i < toDraw.length; i++ ){
		
		drawCircle(i);
		r2 = r * radii[i] || 1/3; // shrink each circle
		rotate[ i ] += .1 * speeds[ i ] * 10;
		x += ( r - r2 ) * Math.cos( rotate[ i ] );
		y += ( r - r2 ) * Math.sin( rotate[ i ] );
		r = r2;
	}

}

fromJson = function(s, f){
	var json = JSON.parse(s);
	for (var i = 0; i < json.length; i++) {
		var el = json[i];
		
		(f || addRadii).apply(this, el)
	};
}

toJson = function(){
	var s = []
	for (var i = 0; i < radii.length; i++) {
			s.push([
				radii[i], //  _radii 
				speeds[i],
				false,
				colors[i]
			])
	};

	return JSON.stringify(s);
}


addRadii = function(){
	var _color 		= Math.round((Math.random() * (0xFFFFFF - 0) + 0)).toString(16),
		radius 		= arg(arguments, 0, 1/3),
		speed 		= arg(arguments, 1, Math.PI / 300),
		controls 	= arg(arguments, 2, true),
		color 		= arg(arguments, 3, _color);

	
 	var r = radii.push(radius) - 1;
	speeds.push(speed);
	
	colors.push(color)

	var ld = String(toDraw.push(0)) -1;
	ld + 1;
	rotate.push(0)
	var index = ld;
	var _id = Math.random().toString(32).slice(2);

	if(!controls) return r;

	var slider1 = '<input data-index="' +  index 
		+ '"  data-r="' +  r
		+ '" id="radius_' + _id
		+ '" type="range" min="' + 1 
		+ '" max="' + 99
		+ '" />';

	var slider2 = '<input data-index="' +  index 
		+ '"  data-r="' +  r 
		+ '" id="speed_' + _id 
		+ '" type="range" min="' + -100
		+ '" max="' + 100
		+ '" />';
	
	$(slider1).appendTo('#sliders').change(function(){
		var _r = $(this).data('r') - 1;
		localStorage['radii' + _r ] = radii[ _r ] = this.value / 100; 
	})

	$(slider2).appendTo('#speeds').change(function(){
		var _r = $(this).data('r') - 1;
		localStorage['speed' + _r ] = speeds[ _r ] = ( this.value / 3) * .005;
	})

	return r
}

