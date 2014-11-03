// Global variables
var FPS = 30;

var textX = 50;
var textY = 50;

function rand(top) {
	return Math.floor(Math.random() * top);
}

function update() {
  textX += 1;
  textY += 1;
}

function draw() {
// Clear first
	// Store the current transformation matrix
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	context.restore();

// Starfield
	context.fillStyle = "#FFF";
	for (i = 0; i < 500; i ++) {
		context.fillRect(rand(canvas.width),rand(canvas.height),1,1);
	}
}
function game_init()
{
	// Sets up game loop
	setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);
}
