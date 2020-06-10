function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;

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
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    };

    this.applyForce = function(force) {
        this.acc.add(force);
    };

    this.show = function() {
        //stroke(this.h, 255, 255, 25);
        this.h = this.h + 1;
        if (this.h > 255) {
            this.h = 0;
        }
        //strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    };

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    };

    this.edges = function() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    };
}

let inc = 0.2;
let scl = 50;
let cols, rows;

let flowField;

let zoff = 0;

let particles = [];

module.exports = {
    setup: function() {
        cols = floor(width / scl);
        rows = floor(height / scl);
        flowField = new Array(cols * rows);

        for (var i = 0; i < 300; i++) {
            particles[i] = new Particle();
        }
    },
    draw: function() {
        let yoff = 0;

        for (var y = 0; y < cols; y++) {
            var xoff = 0;
            for (var x = 0; x < rows; x++) {
                var index = x + y * cols;
                var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                flowField[index] = v;
                xoff+= inc;
            }
            yoff += inc;
            zoff += 0.0003;
        }

        for (var i = 0; i < particles.length; i++) {
            particles[i].follow(flowField);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }
    }
}