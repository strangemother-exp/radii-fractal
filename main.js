var vectors = 4,
	ready = false,
	radii = [],
	speeds = [],
	toDraw = [];

var fractal = document.getElementById( 'fractal' ),
	circles = document.getElementById( 'circles' ),
	fractalContext = fractal.getContext( '2d' ),
	circleContext = circles.getContext( '2d' ),
	width = circles.width,
	height = circles.height,
	rotate = [  ],
	pX = 0,
	pY = 0,
	rCount = 0,
	r = 255,
	g = 255,
	b = 0,
	rD = -5,
	gD = -5,
	bD = 5;

addRadii = function(){
	var _id = Math.random().toString(32).slice(2);
	var i = radii.length
	radii.push(localStorage['sl_' + i] || 1/3);
	speeds.push(localStorage['sp_' + i] || Math.PI / 300);
	var ld = String(toDraw.push(0));
	
	rotate.push(0)
	// Make all the draw's 0
	for (var i = 0; i < toDraw.length; i++) {
		toDraw[i] = 0;
	};
	// draw the last
	toDraw[ld] = 1;
	var index =ld-1;

	

	var st= "<div><span data-uid='" + _id + "' data-for='slider" + ld + "'>" +  index + "</span>"
	st += "<div class='sl' data-uid='" + _id +"' id=slider" + ld + "></div></div>"

	var $st = $('#sliders').append(st);

	function onChange( ev, ui ){ 
		radii[ index + 1 ] = ui.value / 100; 
		localStorage['sl_' + index] = (ui.value * 3) /300;
		$(this).parent().parent().find('span[data-uid="' + $('#slider' + index).data('uid') + '"]').text(localStorage['sl_' + index])
	}

	function onSpeed( ev, ui ){
		speeds[ index ] = 5* ( ( (ui.value * 4 ) / 400 ) - .5 ); 
		localStorage['sp_' + index] = speeds[ index ];
		$(this).parent().find('span[data-for="' + $(this).attr('id') + '"]').text(localStorage['sp_' + index] )

	}
	
	

	$('span[data-uid="' + _id + "\"]").text(radii[index])

	$( '<div class="tl"></div>' ).appendTo( '.sl[data-uid="' + _id +'"]' ).slider({
		orientation: 'horizontal',
		animate: true,
		value: 100 * (localStorage['sl_' + i] || radii[ i]),
		slide: onChange,
		change: onChange,
		step: .01
	});

	var spid = Math.random().toString(32).slice(2);
	var sp = "<span data-uid='" + spid + "' data-for='speed" + index + "'>Text</span><div class='sl' data-uid='" + spid + "' id=speed" + index + "></div>"
	$('#speeds').append(sp);
	
	$('.sl[data-uid="'+ spid + '"]').slider({
		orientation : 'horizontal',
		animate : true,
		value : 50 + ( 100 * (localStorage['sp_' + index] || speeds[ index ]) / 5 ),
		slide : onSpeed,
		change : onSpeed,
		step : .01,
		max: 50 + 5,
		min: 50 - 5
	});
} 

addRadii(null)



fractalContext.strokeStyle = '#222';
fractalContext.fillStyle   = 'rgba(51, 51, 51, .05 )';
fractalContext.lineWidth   = 2;

circleContext.strokeStyle = '#eee';
circleContext.lineWidth   = 2;

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
	if(ready)
	render();
})();

function render(){
	var x = width  / 2,
		y = height / 2,
		r = Math.min( width, height ) / 2,
		r2;
	

	// clear the circles
	circleContext.clearRect( 0, 0, width, height );

	// draw one circle
	function drawCircle( ix ){
		circleContext.beginPath();
		circleContext.arc( x, y, r, 0, 2 * Math.PI, false );
		circleContext.stroke();
	}

	for( var i=0; i < toDraw.length; i++ ){
		
		drawCircle( i );
		r2 = r * (radii[i+1]) || 1/3; // shrink each circle
		rotate[ i ] += .1 * speeds[ i ] * 10;
		x += ( r - r2 ) * Math.cos( rotate[ i ] );
		y += ( r - r2 ) * Math.sin( rotate[ i ] );
		r = r2;
	}
}