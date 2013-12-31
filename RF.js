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

var circles = document.getElementById( 'circles' );

RF = {
    _class: 'RadiiFractal',
    draw: {},
    data: [],
    __config: {
        speed: .01,
        radius: .9,
        arcSize: 360,
        arcStart: 0,
        // Starting positon to draw a circle. 
        // 0 to 360. zero being 12 o'clock
        orientation: 0
    }
}

RF.loop = function(){
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
        RF.render();
    })();
}

RF.changeRadii = function changeRadii(v){
    for (var i = 0; i < RF.data.length; i++) {  
        RF.data[i]= v
    };
}

RF.allRadii = function(k, v){
    for (var i = 0; i < RF.data.length; i++) {
        RF.data[i][k] = v
    };
}

RF.render = function render(context){
    if(context === undefined) {
        context = RF.context;
    }

    var offset  = -100,
        x       = RF.width  / 2 + offset,
        y       = RF.height / 2,
        r       = Math.min( RF.width, RF.height ) / 2,
        r2;

    context.lineWidth = 1;
    context.clearRect( 0, 0, RF.width, RF.height );

    var circle;
    var _speed;

    for (var i=0; i < RF.data.length; i++ ) {
        circle = RF.data[i]; 
        _speed =  circle.speed;
         if(circle.data('reverse')) {
            _speed = -circle.speed
        }
        r2 = r * circle.radius || 1/3; // shrink each circle
        circle.rotate += .1 * _speed * 10;
        x += ( r - r2 ) * Math.cos( circle.rotate );
        y += ( r - r2 ) * Math.sin( circle.rotate );
        circle.r = r = r2;
        circle.x = x
        circle.y = y

        RF.draw.Circle(context, circle);
        RF.draw.Line(context, circle);
        circle.render(context, x, y, r, r2)
        // RF.data[i].radii = r;
    }
}

RF.draw.Circle = function drawCircle(context, circle) {
    if(context === undefined) {
        context = RF.context;
    }

    context.beginPath();
    context.strokeStyle = circle.color
    //console.log(circle._data)
    var orient = ( (2 / 360) * (RF.config('orientation') + -90) ) * Math.PI;
    var _arcStart = orient + ( (2 / 360) * (circle.arcStart ||  RF.config('arcStart')) ) * Math.PI;
    var _arc = orient + ( (2 / 360) * (circle.arcSize ||  RF.config('arcSize')) ) * Math.PI;
    var _x = circle.x,
        _y = circle.y;

    context.arc( _x, _y, circle.r, _arcStart, _arc , false);
    context.stroke();
}

RF.draw.LineGraph = function(context, circle, label) {
   
    if(label.data.length < 2) return
    var s = Smooth(label.data, { scaleTo: 100}),
        len = s.count;

    context.lineWidth = 1;
    context.lineJoin = 'round';
    context.fillStyle = circle.color;
    var d=0;
    var i = 0
    context.moveTo(0,0);
    
    while(i!=len) {
        i++
        d = label.data[i];
        // Draw a spot on the
        // point
        context.beginPath();
        var offset = (d*d) / (label.y*label.y) + label.y;
        context.arc(label.x + (i), offset , 1, 0, Math.PI * 2, true);
        // context.lineTo(label.x + (i*1.9), d - label.y)
        //context.stroke();
        context.fill();   
    }
    context.closePath();
    // debugger;
}

RF.draw.Label = function drawLabel(context, circle, p2) {
    if(context === undefined) {
        context = RF.context;
    }

    var x   = RF.width - 50 + -100,
        y   = ( (circle.index * 30) + 20),
        dx  = ( (p2)? p2.x: x) - circle.x,
        dy  = ( (p2)?p2.y: y) - circle.y,
        len = Math.sqrt(dx*dx+dy*dy),
        p   = p2, 
        pad = 1,
        left = true;
    
    RF.context.save();
    
    var label, fontLine, method, value;

    RF.context.fillStyle = "white"
    RF.context.font = "normal 16px Arial";
    RF.context.fillText(circle.name, 0,0);
    RF.context.font = "normal 10px Arial";
    
    if(circle._._labels){
        var item;
        for (var i = 0; i < circle._._labels.length; i++) {
            item = circle._._labels[i];

            label = item.name;
            fontLine = item.font;
            method = item.method;
            _m = method.apply(circle);
            item.x = RF.width - 140
            item.y = y+=20;
            // debugger;
            value = (_m && _m.hasOwnProperty('toString') )? _m.toString(): _m;
           
            if(_m.type == 'line') {
                // create a chart.
                if(!item.data) {
                    item.data = [];
                }
                value = _m.v
                var _w = context.measureText(label + ' ' + value).width;
                if(item.data.length > _w) {
                    item.data.shift()
                } else {
                    item.data.push(_m.v);    
                }
                // console.log(item.data);
                RF.draw.LineGraph(context, circle, item);
                

            }

            RF.context.translate(item.x, item.y);
            RF.context.fillText(label + ' ' + value, 0, i*10);
            
        };
    }

    RF.context.restore();
    
    return {
        x: x,
        y: y
    }
}

RF.draw.Line = function drawLine(context, circle) {
    if(context === undefined) {
        context = RF.context;
    }

    if(circle!==undefined && circle.controls) {
        var label = circle.render()
        RF.context.beginPath();
        RF.context.moveTo(circle.x + circle.r, circle.y );
        var tx = RF.width * .9, 
            ty = circle.y;
        RF.context.lineTo(tx + -100 + 35, label.y - 5);
        RF.context.stroke();
    }
}

RF.fromJson = function(s, f){
    var json = JSON.parse(s);
    for (var i = 0; i < json.length; i++) {
        var el = json[i];   
        (f || RF.addRadii).apply(this, el)
    };
}

RF.toJson = function(){
    var s = []
    for (var i = 0; i < RF.data.length; i++) {
        s.push([
            RF.data[i].radius, //  _radii 
            RF.data[i].speed,
            false,
            RF.data[i].color
        ])
    };

    return JSON.stringify(s);
}

RF.radiiMethods = function(radii) {
    
    return (function(){
        var self = this;
        var init = function(radii){
            return this;
        };

        this.render = function(context){
            
            var x = function(context){
                var label = RF.draw.Label(context, self);
                return label;    
            }

            return x(context)
        }

        this.v = function(k, v) {
            /*
            change a a value within this scope (radii)
            and return a chain.
            The value can be altered using the variable.
             */
            if(v) {
                this[k] = v;
                return this;
            }
            return this[k];
        };

        this.label = function() {
            /*
            Places a point label in the list.
             */
            var label = arg(arguments, 0, '');
            var method = arg(arguments, 1, false);
            var font = arg(arguments, 2, undefined);

            
            if(!this._labels) {
                this._labels = [{
                    name: label,
                    font: font,
                    method: method
                }];
            }

            return this
        }

        return init.apply(this, arguments)
    }).apply(radii, arguments)
}

RF.addRadii = function(){
    var _color      = Math.round((Math.random() * (0xFFFFFF - 0) + 0)).toString(16),
        radius      = arg(arguments, 0, 1/3),
        speed       = arg(arguments, 1, Math.PI / 300),
        controls    = arg(arguments, 2, true),
        color       = arg(arguments, 3, _color),
        name        = arg(arguments, 4, '');
    var _id = Math.random().toString(32).slice(2);
    var r = radius - 1;

    /*
    Initial rotation dictates the start state of the Radii.
    
    TOP:    Math.PI*1.5
    RIGHT:  0
    BOTTOM: Math.PI*.5
    LEFT:   Math.PI
    */
 
    var d = {
        _class:   'Cog',
        id:       _id,
        rindex:   r,
        radius:   radius,
        speed:    speed,
        controls: controls,
        color:    color,
        name:     name,
        rotate:   Math.PI * .5,
        tspeed:   speed * 3,
        tradius:  radius * 100,
        __ar:     0,
        _:        null,
        toString: function(){ return 'Cog(' + this.id + ')'; },
        data: function(obj){
            if(this._data == undefined) this._data = {}
            if(typeof(obj) == 'string'){
                return (this._data.hasOwnProperty(obj))? this._data[obj]: undefined;
            }
            if(obj) {
                this._data = obj;
                return this
            } else {
                return this._data || {};
            }

        }
    }

    // Methods used by a circle.
    d._ = RF.radiiMethods(d)
    var index  = d.index = RF.data.push(d) - 1;

    if(!controls) return d;
    RF.controls(d);
    return d;
}

RF.controls = function(d){
    var html = sprintf($('.templates .controls').clone().html(), d);
    
    var controls = $('<div/>', { 
        'class': 'control',
        html: html.trim()
    }).appendTo('body');

    $('#radius_' + d.id).val( d.radius * 100 );
    $('#radius_' + d.id).change(function(){
        var _r = $(this).data('r') - 1;
        var index = $(this).data('index');
        if(index > -1) {
            RF.data[index].radius = this.value / 100; 
        }
    });

    $('#speed_' + d.id).val( this.speed * 3 );
    $('#speed_' + d.id).change(function(){
        var _r = $(this).data('r') - 1;
        var index = $(this).data('index');
        if(index > -1) {
            RF.data[index].speed = ( this.value / 3) * .005;
        }
    })

    return controls;
}

RF.start = function(context){
    this._context = context || this._context;
    this.element = document.getElementById( this._context );
    this.context = this.element.getContext( '2d' );
    this.width = this.element.width;
    this.height = this.element.height;
    this.layers = [];
    RF.loop();

    this.container = new CanvasLayers.Container(this.element, false);
    var _l = new CanvasLayers.Layer(10, 60, 60, 60);

    this.layers.push({
        name: 'main',
        layer: _l
    });

    this.container.getChildren().add(_l);

    _l.onRender = function(layer, rect, context) {
        console.log('render')
        context.fillStyle = '#000';
        context.fillRect(70, 0, layer.getWidth(), layer.getHeight());
        RF.render(context)
    }

};

RF.config = function(name, value){ 
    if(name !== undefined) {
        if(value !== undefined) {
            RF.__config[name] = value;
            return this;
        }
        return RF.__config[name]
    } else {

        return RF.__config;
    }
}

var Radii = function(canvasId){
    var self = this;
    RF.start(canvasId);

    R = {
        _class: 'Radii',
        master: function(){
            this.masterCog = cog(.99 , 0, false, 'master').v('color', 'black');
        },
        __cogi: 0,

        speed: function(v){
            /*
            Change the overall speed of RF cogs.
            Each cog will be altered - all new cogs will 
            be this speed by default.
             */
            return RF.config.call(this, 'speed', v);
        },
        radius: function(v){
            // Change the generic value for radius. By default this is .9
            return RF.config.call(this, 'radius', v)
        },
        controls: function(v) {
            return RF.config.call(this, 'controls', v)
        },
        randomString: function(){
            // returns a 7 character random string
            return Math.random().toString(32).slice(2)
        },
        clear: function(){
            $('body .control').remove();
            R.__cogi = 0;
            RF.data = []
        },
        data: function(obj){
            if(obj) {
                this._data = obj;
                return this
            } else {
                return this._data || {};
            }
        },
        cog: function(){
            /*
            create a nested cog within the Radii fractal.
            Returned is a cog scoped chain.

            E.g:

                name    String - Give the cog a unique name (not enforced)
                radius  Number - width of the cog 0.00 - 1.00
                speed   Number - speed of rotation 0.00 >
                control Boolean - this cog has control inputs.
                
                cog('foo');
                cog(name, radius, speed, control);

            Define a cog without a name - an ID will be given
                
                cog(.9)
                cog(radius, speed, control)
             */
            var name     = arg(arguments, 0, R.randomString())
            var _radius  = arg(arguments, 1, R.radius())
            var _speed   = arg(arguments, 2, R.speed())
            var _control = arg(arguments, 3, true);
            var data    = arg(arguments, 4, {});

            if(!R.masterCog) {
                R.master();
            };
            if(typeof(name) == 'number') {
                data = _radius || _data;
                // radius passed and no object
                name = data.name || R.randomString();
                _speed = data.speed || R.speed();
                _control = data.control || true;
                _radius = arguments[0];
            }
            
            if(!name) {
                name = Math.random().toString(32).slice(2);
            }

            var _cog = RF.addRadii.call(R,
                _radius, 
                _speed ,
                _control,
                undefined,
                name
            )
            
            // debugger;
            if(typeof(data) == 'object') {
                _cog.data(data);
            }

            R.__cogi++;
            _cog.cog = R.cog;
            if(name) return _cog;
            return R;
        }
    }

    return R;
}
