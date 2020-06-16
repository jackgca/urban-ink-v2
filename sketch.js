// general settings

let utils = require('../public/utils/index.js');
const path = require('path');

utils.loadPiece('Molnar');
utils.loadPiece('BezierLines');
utils.loadPiece('NoiseSquare');
utils.loadPiece('ShadeFill');

let width = 800;
let height = 600;
let rootPath = path.join(window.__dirname, '..');

let menlo;

function mouseClicked() {
	save();
}


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
	//noFill();

	let seed = floor(random(0, 1000));
	console.log('seed:', seed);

	randomSeed(seed);
	//noiseSeed(config.seed);
	stroke(0, 0, 0, 1);
	//translate(width/2, height/2);
	//rotate(random(0, 360));
	//loadPixels();
}

function draw() {
	//Molnar.example();
	//NoiseSquare.example1();
	//BezierLines.example();
	ShadeFill.example();
}
