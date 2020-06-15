// general settings

let utils = require('../public/utils/index.js');
utils.loadPiece('Molnar');
utils.loadPiece('BezierLines');

let width = 800;
let height = 600;

let menlo;

function preload() {
	menlo = loadFont('../lib/fonts/daisywhl.otf');
}

function setup() {
	pixelDensity(1);
	createCanvas(width, height, SVG);
	colorMode(HSB);
	textFont(menlo);
	textSize(32);
	angleMode(DEGREES);

	background(config.bgColor);
	stroke(config.penColor);
	strokeWeight(config.thickness);

	noLoop();

	//randomSeed(config.seed);
	//noiseSeed(config.seed);
	stroke(0, 0, 0, 1);
	//translate(width/2, height/2);
	//rotate(random(0, 360));
	//loadPixels();
	
	
}

function draw() {
	//Molnar.example();
	BezierLines.example();
}
