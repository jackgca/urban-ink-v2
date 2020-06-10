// general settings

console.log(config);

object_size = 800;
object_step = 200;
circle_logic = true;
circle_size = 10;

let line_size = 40;
let line_number = 20;

function lines() {
	let x1 = -line_size;
	let y1 = -line_size;
	let x2 = -line_size;
	let y2 = line_size;

	for (var i = 0; i < line_number; i++) {
		n = noise(i, i+10) * 10 * (i < line_number/2 ? -1 : 1);
		m = map(n, 0, 1, config.mapMin, config.mapMax);

		bezier(x1, y1, x1-n, y1*n, x2*n, y2+n, x2, y2);
	}
	save();
}

function setup() {
	createCanvas(windowWidth, windowHeight, SVG);
	colorMode(HSB, 100);
	background(config.bgColor);
	stroke(config.penColor);
	strokeWeight(config.thickness);
	noLoop();
	noFill();
	randomSeed(config.seed);
	noiseSeed(config.seed);
	translate(windowWidth/2, windowHeight/2);
	console.log('starting');
	lines();
}
