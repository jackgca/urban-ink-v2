class GradientLine {
	constructor(x1, y1, x2, y2, color1, color2) {
		this.x1 = x1;
		this.y1 = y1;
		this.color1 = color1;
		this.color2 = color2;
		this.angle = atan2(y2 - y1, x2 - x1);
		this.length = sqrt(sq(x2 - x1), sq(y2 - y1));
	}

	displayLine() {
		push();
		translate(this.x1, this.y1);
		rotate(this.angle);

	}
}

function distanceBetween(x1, y1, x2, y2) {
	return sqrt(sq(x2 - x1), sq(y2 - y1));
}

let oases = [];
let sources = [];

class Oasis {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Source {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.connections = [];
	}

	findConnections() {
		oases.forEach(o => {
			if (distanceBetween(this.x, this.y, o.x, o.y) < 40) {
				this.connections.push(o);
			}
		});
	}

	drawLines() {
		this.connections.forEach(c =>{
			push();
			stroke(img.get(this.x, this.y));
			line(this.x, this.y, c.x, c.y);
			pop();
		});
	}
}

function createPixels() {
	for (var i = 0; i < 24; i++) {
		oases.push(new Oasis(random(0, img.width), random(0, img.height)));
	}

	let numRows = 25;
	let numCols = 35;


	for (var x = 0; x < numCols; x++) {
		for (var y = 0; y < numRows; y++) {
			if (random() < 0.8) {
				let new_x = (img.width / numCols * x) + (img.width / numCols / 2);
				let new_y = (img.height / numRows * y) + (img.height / numRows / 2)
				pixels.push(new Source(
					new_x,
					new_y,
					img.get(new_x, new_y)
				));
			}
		}
	}
}

function drawPixels() {
	pixels.forEach(p => {
		p.findConnections();
		p.drawLines();
	});
}

let img;

module.exports = {
	example: function() {
		image(img, 0, 0);
		img.loadPixels();
		createPixels();
		background('white');
		drawPixels();
	},
	loadImg: function() {
		img = loadImage(path.join(rootPath, 'assets', '0001.jpg'));
	}
}
