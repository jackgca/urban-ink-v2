// general settings

let utils = require('../public/utils/index.js');
const path = require('path');

utils.loadPiece('Molnar');
utils.loadPiece('BezierLines');
utils.loadPiece('NoiseSquare');
utils.loadPiece('ShadeFill');
utils.loadPiece('FlowField');
utils.loadPiece('PixelLines');

let width = 800;
let height = 600;
let rootPath = path.join(window.__dirname, '..');

let menlo;

function mouseClicked() {
	//save();
}


function preload() {
	menlo = loadFont('../lib/fonts/daisywhl.otf');
	PixelLines.loadImg();
}

function setup() {
	pixelDensity(1);
	createCanvas(width, height, SVG);
	//colorMode(HSB);
	textFont(menlo);
	textSize(32);
	angleMode(DEGREES);

	background('white');
	stroke(config.penColor);
	strokeWeight(config.thickness);

	noLoop();
	//noFill();

	let seed = floor(random(0, 1000));
	//console.log('seed:', seed);

	//randomSeed(311);
	noiseSeed(311);
	stroke(0, 0, 0, 1);
}

function draw() {
	PixelLines.example();
	//Molnar.example();
	//NoiseSquare.example1();
	//BezierLines.example();
	//ShadeFill.example1();
	//ShadeFill.example2();
	//FlowField.example();
}
