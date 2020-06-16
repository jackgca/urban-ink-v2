function Particle() {
    this.pos = createVector(random(-80, width + 80), random(-80, height + 80));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = 170;

    this.prevPos = this.pos.copy();

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + (y * cols);
        var force = vectors[index];
        this.applyForce(force);
    };

    this.applyForce = function(force) {
        this.acc.add(force);
    };

    this.show = function() {
        stroke(this.h, 90, 90, 1);
        this.h = this.h + 1;
        if (this.h > 240) {
            this.h = 170;
        }
        //strokeWeight(1);
        //circlePainter(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); // actual drawing of the path
        this.updatePrev();
    };

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    };

    this.edges = function() {
        if (this.pos.x > width + 80) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < -80) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height + 80) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < -80) {
            this.pos.y = height;
            this.updatePrev();
        }
    };
}

function circlePainter(x1, y1, x2, y2) {
    let length = sqrt(sq(x2 - x1) + sq(y2 - y1));
    let interval = length / 10;
    push();
    fill(color(random(160, 220), random(70, 90), random(70, 90), 1));
    console.log('length: ', length);
    console.log('interval: ', interval);
    let count = 0;
    for (var i = 0; i < length; i += interval) {
        let pos = utils.midPoint(x1, y1, x2, y2, i / length);
        //translate(pos.x, pos.y);
        noStroke();
        let diameter = abs(length - abs(i - length / 2)) * 10;
        console.log(pos.x, pos.y, diameter);
        circle(pos.x, pos.y, diameter);
        count++;
    }
    console.log('count: ', count);
    pop();
}

let inc = 0.01;
let scl = 25;
let cols, rows;

let flowField;

let zoff = 0;

let particles = [];

function setupField() {
    cols = floor(width / scl);
    rows = floor(height / scl);
    flowField = new Array(cols * rows);

    for (var i = 0; i < 400; i++) {
        particles[i] = new Particle();
    }
}

function drawField() {
    let yoff = 0;

    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + (y * cols);
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowField[index] = v;
            xoff+= inc;
        }
        yoff += inc;
        //zoff += random() < 0.8 ? -0.00003: 0.00003;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].update();
        //particles[i].edges();
        particles[i].show();
    }
}

module.exports = {
    example: function() {
        setupField();

        for (var i = 0; i < 200; i++) {
            drawField();
        }
    }
}