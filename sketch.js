// general settings

let utils = require('../public/utils/index.js');
utils.loadPiece('FlowField');

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
	stroke(0, 0, 0, 1);

	//translate(windowWidth/2, windowHeight/2);

	console.log('starting');
	
	//BezierLines.example();

	FlowField.setup();
}

function draw() {
	FlowField.draw();
}
