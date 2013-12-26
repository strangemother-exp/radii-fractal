/*! sprintf.js | Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license */(function(e){function r(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function i(e,t){for(var n=[];t>0;n[--t]=e);return n.join("")}var t=function(){return t.cache.hasOwnProperty(arguments[0])||(t.cache[arguments[0]]=t.parse(arguments[0])),t.format.call(null,t.cache[arguments[0]],arguments)};t.format=function(e,n){var s=1,o=e.length,u="",a,f=[],l,c,h,p,d,v;for(l=0;l<o;l++){u=r(e[l]);if(u==="string")f.push(e[l]);else if(u==="array"){h=e[l];if(h[2]){a=n[s];for(c=0;c<h[2].length;c++){if(!a.hasOwnProperty(h[2][c]))throw t('[sprintf] property "%s" does not exist',h[2][c]);a=a[h[2][c]]}}else h[1]?a=n[h[1]]:a=n[s++];if(/[^s]/.test(h[8])&&r(a)!="number")throw t("[sprintf] expecting number but found %s",r(a));switch(h[8]){case"b":a=a.toString(2);break;case"c":a=String.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=h[7]?a.toExponential(h[7]):a.toExponential();break;case"f":a=h[7]?parseFloat(a).toFixed(h[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=String(a))&&h[7]?a.substring(0,h[7]):a;break;case"u":a>>>=0;break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(h[8])&&h[3]&&a>=0?"+"+a:a,d=h[4]?h[4]=="0"?"0":h[4].charAt(1):" ",v=h[6]-String(a).length,p=h[6]?i(d,v):"",f.push(h[5]?a+p:p+a)}}return f.join("")},t.cache={},t.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw"[sprintf] huh?";if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw"[sprintf] huh?";s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw"[sprintf] huh?";s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";r.push(n)}t=t.substring(n[0].length)}return r};var n=function(e,n,r){return r=n.slice(0),r.splice(0,0,e),t.apply(null,r)};e.sprintf=t,e.vsprintf=n})(typeof exports!="undefined"?exports:window);

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
        v = (_a[ia] === undefined)? def: _a[ia]
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
	fractal = document.getElementById( 'fractal' ),
	circles = document.getElementById( 'circles' ),
	fractalContext = fractal.getContext( '2d' ),
	circleContext = circles.getContext( '2d' ),
	width = circles.width,
	height = circles.height,
	radiiClock =0,
	posRadClock = true,
	data= [], // Store everything in here...
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
	for (var i = 0; i < data.length; i++) {	
		data[i]= v
	};
}

function render(){
	var offset = -100,
		x = width  / 2 + offset,
		y = height / 2,
		r = Math.min( width, height ) / 2,
		r2;

	circleContext.lineWidth = 2;
	// clear the circles
	circleContext.clearRect( 0, 0, width, height );

	// draw one circle
	function drawCircle(circle){
		circleContext.beginPath();
		circleContext.strokeStyle = circle.color

		circleContext.arc( x, y, r, 0, 2 * Math.PI, false );
		circleContext.stroke();
	}

	function drawLabel( circle, p1, p2, alignment, padding ){
		if (!alignment) alignment = 'left';
		if (!padding) padding = 0;

		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;   
		var p, pad;

		if (alignment=='center'){
			p = p1;
			pad = 1/2;
		} else {
			var left = alignment=='left';
			p = left ? p1 : p2;
			pad = padding / Math.sqrt(dx*dx+dy*dy) * (left ? 1 : -1);
		}

		// debugger;
		//circleContext.save();
		circleContext.textAlign = alignment;
		// circleContext.translate(p.x+dx*pad,p.y+dy*pad);
		//circleContext.rotate(Math.atan2(dy,dx));
		circleContext.fillStyle = "white"
		// circleContext.fillText(text,0,0);
		//circleContext.restore();
		//circleContext.fillText(text,0,0);
		
		// circleContext.fillStyle = "whitwe";
		circleContext.font = "normal 16px Arial";
		var x = width - 50 + offset;
		var y = ( (circle.index * 30) + 20);
		
		circleContext.fillText(circle.name, x, y) ;
		// debugger
		return {
			x: x,
			y: y
		}
	}

	function drawLine(circle) {
		
		if(circle!==undefined && circle.controls) {
			var label = drawLabel(circle, { x:x, y:y }, {x:x, y:y} )

			circleContext.beginPath();
			circleContext.moveTo(x, y);
			var tx=width * .9, 
				ty=y;
			// console.log(tx,label.x)
			circleContext.lineTo(tx + offset + 35, label.y - 5);
			circleContext.stroke();
		}
	}

	var circle;
	for( var i=0; i < data.length; i++ ){
		circle = data[i]; 
		
		r2 = r * circle.radius || 1/3; // shrink each circle
		circle.rotate += .1 * circle.speed * 10;
		x += ( r - r2 ) * Math.cos( circle.rotate );
		y += ( r - r2 ) * Math.sin( circle.rotate );
		r = r2;
		circle.x = x;
		circle.y = y
		drawCircle(circle);
		drawLine(circle);
		// data[i].radii = r;
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
	for (var i = 0; i < data.length; i++) {
			s.push([
				data[i].radius, //  _radii 
				data[i].speed,
				false,
				data[i].color
			])
	};

	return JSON.stringify(s);
}


addRadii = function(){
	var _color 		= Math.round((Math.random() * (0xFFFFFF - 0) + 0)).toString(16),
		radius 		= arg(arguments, 0, 1/3),
		speed 		= arg(arguments, 1, Math.PI / 300),
		controls 	= arg(arguments, 2, true),
		color 		= arg(arguments, 3, _color),
		name 		= arg(arguments, 4, '');
	var _id = Math.random().toString(32).slice(2);
 	var r = radius - 1;

	var d = {
		id: _id,
		rindex: r,
		radius: radius,
		speed: speed,
		controls: controls,
		color: color,
		name: name,
		rotate: 0,
		tspeed: speed * 3,
		tradius: radius * 100
	}

	var index  = d.index = data.push(d) - 1;
	

	if(!controls) return d;
	var html = sprintf($('.templates .controls').clone().html(), d);
	
	$('<div/>', { 
		'class': 'control',
		html: html.trim()
	}).appendTo('body');

	$('#radius_' + d.id).val( d.radius * 100 );
	$('#radius_' + d.id).change(function(){
		var _r = $(this).data('r') - 1;
		var index = $(this).data('index');
		// debugger;
		console.log("Index", index)
		if(index > -1) {
			console.log(data[index])
			data[index].radius = this.value / 100; 
		}
	})
	$('#speed_' + d.id).val( this.speed * 3 );
	$('#speed_' + d.id).change(function(){
		var _r = $(this).data('r') - 1;
		var index = $(this).data('index');
		if(index > -1) {
			data[index].speed = ( this.value / 3) * .005;
		}
	})
	
	return d;
}

