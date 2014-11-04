// Global variables
var FPS = 60;
var warp= 86400;
var PI2 = 2 * Math.PI;

// camera
var cam_trans_sticky = 0;
var cam_rot_sticky = 0;

var mouse_start_x;
var mouse_start_y;
var mouse_start_rot;
var cam_last_x;
var cam_last_y;
var cam_last_rot;

var cam_x = 0;
var cam_y = 0;
var cam_rotate = 0;
var cam_scale = 0.000000001;

function rand(top) {
	return Math.floor(Math.random() * top);
}

function update() {
	// Update the universe!  Each object interacts with each one below.
	var delta_t = warp/FPS;

	for (var i = 0; i < system.length; i++)
	{
		var o1 = system[i];

		// First: update object's position based on velocity vector
		o1.x += o1.velocity.magnitude * Math.cos(o1.velocity.angle) * delta_t;
		o1.y += o1.velocity.magnitude * Math.sin(o1.velocity.angle) * delta_t;

		for (var j = 0; j < system.length; j++)
		{
			if (i != j)
			{
				// Next: each object in the system interacts
				var o2 = system[j];

				// Attractive force
				var grav_force = phys_gravitation(o1,o2);
				// Scale by time-rate
				grav_force.magnitude *= delta_t;
				o1.velocity = vector_add(o1.velocity,grav_force);
			}
		}
	}

	// Last step: normalize the universe.  Sun should be kept at (0,0)
	for (var i = system.length - 1; i >= 0; i--)
	{
		system[i].x -= system[0].x;
		system[i].y -= system[0].y;
	}
}

function draw() {
// Clear first: also, resets transform matrix
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

// Save default context
	context.save();

// Set camera
	// centers coordinates first
	context.translate((canvas.width/2),(canvas.height/2));
	// apply scale and rotation
	context.scale(cam_scale,cam_scale);
	context.rotate(cam_rotate);
	context.translate(cam_x, cam_y);
	// apply camera position

// Starfield
	//context.fillRect(0, 0, 100000, 100000);
	/* context.fillStyle = "#FFF";
	for (i = 0; i < 500; i ++) {
		context.fillRect(rand(canvas.width),rand(canvas.height),1,1);
	} */

// Celestial bodies
	context.strokeStyle = "#022";
	context.fillStyle = "#FFF";
	context.font="10px Georgia";

	for (var i = 0; i < system.length; i++)
	{
		var object = system[i];
//console.info("Object.x=" + object.x + ", object.r=" + object.radius);
		context.beginPath();
		context.arc(object.x,object.y,10/cam_scale,0,PI2,true);
		context.closePath();
		context.lineWidth=3/cam_scale;
		context.stroke();

		context.beginPath();
		context.arc(object.x,object.y,object.radius,0,PI2,true);
		context.fill();

		// Names under objects
		context.save();
			context.translate(object.x,object.y+object.radius);
			context.scale(1/cam_scale,1/cam_scale);
			context.fillText(object.name,-2*object.name.length,20);
		context.restore();
		//context.fillRect(object.x-object.radius/2,object.y-object.radius/2,object.radius,object.radius);
	}

// Restore context
	context.restore();

// OSD
	//context.fillStyle = "#7F0";
	//context.font="20px Georgia";
	//context.fillText("FPS: ",10,50);
}

function game_zoom(scroll)
{
	var wheel = Math.pow(2,-scroll/8);
	//console.info(wheel);
	cam_scale *= wheel;
	return false;
}

function game_init()
{
	// Capture mouse / key events
	canvas.onmousedown=function(event) {
		// Clear any previous action
		cam_trans_sticky = cam_rot_sticky = 0;
		canvas.style.cursor='auto';

		// Store mouse x/y
		mouse_last_x = event.clientX;
		mouse_last_y = event.clientY;

		// Check button and set appropriate tool
		if (event.button == 0)
		{
			cam_trans_sticky=1;
			cam_last_x = cam_x;
			cam_last_y = cam_y;
			mouse_start_x = event.clientX;
			mouse_start_y = event.clientY;
			canvas.style.cursor='move';
		} else if (event.button==1) {
			cam_rot_sticky=1;
			cam_last_rot = cam_rotate;
			mouse_start_rot = Math.atan2(-canvas.height/2 + event.clientY, -canvas.width/2 + event.clientX); 
			canvas.style.cursor='crosshair';
		}
	};
	canvas.onmouseup=function(event) {
		canvas.style.cursor='auto';
		cam_trans_sticky = cam_rot_sticky = 0;
	};
	canvas.onmousemove=function(event) {
		if (cam_trans_sticky)
		{
			cam_x = cam_last_x - (mouse_start_x - event.clientX) / cam_scale;
			cam_y = cam_last_y - (mouse_start_y - event.clientY) / cam_scale;
		}
		else if (cam_rot_sticky)
		{
			cam_rotate = cam_last_rot - mouse_start_rot + Math.atan2(-canvas.height/2 + event.clientY, -canvas.width/2 + event.clientX); 
		}
	};

	canvas.addEventListener('mousewheel', function(event) {
		game_zoom(event.wheelDelta);
	});

	canvas.addEventListener('DOMMouseScroll', function(event) {
		game_zoom(event.detail);
	});

/*	canvas.addEventListener('mousewheel',function(event){
		var wheel = event.wheelDelta / 120;
		console.info(wheel);
		scale *= wheel;
		return false;
	});*/

	// Sets up game loop
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
}
