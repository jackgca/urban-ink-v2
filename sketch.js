// general settings

let bezierLines = require('../public/pieces/BezierLines.js')

console.log(config);

function setup() {
	createCanvas(windowWidth, windowHeight, SVG);
	colorMode(HSB);

	background(config.bgColor);
	stroke(config.penColor);
	strokeWeight(config.thickness);

	noLoop();
	noFill();

	randomSeed(config.seed);
	noiseSeed(config.seed);

	translate(windowWidth/2, windowHeight/2);

	console.log('starting');
	
	let lines = new bezierLines(20, 20);
	lines.run();
}
