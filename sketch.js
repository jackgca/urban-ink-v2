// general settings

let bezierLines = require('../public/pieces/BezierLines.js')

console.log(config);

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
	
	let newLine = new bezierLines(50, 10);
	newLine.makeShape();
}
