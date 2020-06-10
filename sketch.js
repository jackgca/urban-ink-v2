// general settings

let utils = require('../public/utils/index.js');
utils.loadPiece('BezierLines');

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
	
	//BezierLines.example();

	let newLine = new BezierLines.BezierLine(30, 40);
	newLine.makeShape();
}
