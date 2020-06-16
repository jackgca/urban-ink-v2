function getMinMax(lines) {
    let minY = lines[0].y0;
    let maxY = lines[0].y0;

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].y0 < minY) {
            minY = lines[i].y0;
        }
        if (lines[i].y1 < minY) {
            minY = lines[i].y1;
        }
        if (lines[i].y0 > maxY) {
            maxY = lines[i].y0;
        }
        if (lines[i].y0 > maxY) {
            maxY = lines[i].y1;
        }
    }

    return {minY: minY, maxY: maxY};
}

function getMeetPoint(y, lines) {
    var meet = [];
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l.isValidY(y)) {
            meet.push(l.getX(y));
        }
    }

    //sort
    for (var i = 0; i < meet.length; i++)
        for (var j = i; j < meet.length; j++) {
            if (meet[i]>meet[j]) {
                var temp =meet[i];
                meet[i]=meet[j];
                meet[j]=temp;
            }
        }

    return meet;
}

function Line(start, end) {
    this.x0 = start.x;
    this.x1 = end.x;
    this.y0 = start.y;
    this.y1 = end.y;
    this.m = (this.y1 - this.y0) / (this.x1 - this.x0);

    this.getX = function (y) {
        if (!this.isValidY(y))
            throw new RangeError();

        return 1 / this.m * (y - this.y0) + this.x0;
    }

    this.isValidY = function (y) {
        if (y >= this.y0 && y < this.y1) {
            return true;
        }
        if (y >= this.y1 && y < this.y0) {
            return true;
        }

        return false;
    }
}

class ScanPoly {
    constructor(coords, x, y, angle) {
        this.coords = coords;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.lines = [];
    }

    displayShape() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        // generate line objects
        for (var i = 0; i < this.coords.length - 1; i++) {
            let line = new Line({x: this.coords[i].x, y: this.coords[i].y}, {x: this.coords[i + 1].x, y: this.coords[i + 1].y});
            this.lines.push(line);
        }

        this.lines.push(new Line(
            {x: this.coords[this.coords.length - 1].x, y: this.coords[this.coords.length - 1].y},
            {x: this.coords[0].x, y: this.coords[0].y}
        ));

        // get min and max
        let max = getMinMax(this.lines);

        // draw scan lines
        let count = 0;
        for (var y = max.minY; y < max.maxY; y = y + (count / 10)) {
            let meetPoint = getMeetPoint(y, this.lines);
            for (var i = 1; i < meetPoint.length; i += 2) {
                line(meetPoint[i - 1], y, meetPoint[i], y);
            }
            count++;
        }

        // draw border
        if (random() < 0.1) {
            beginShape();
            for (var i = 0; i < this.coords.length; i++) {
                vertex(this.coords[i].x, this.coords[i].y);
            }
            endShape(CLOSE);
        }
        pop();
    }
}

module.exports = {
    example: function() {
        noFill();
        let shapeSize = 20;
        let numRows = 10;
        let numCols = 10;
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                let boundX = random(shapeSize);
                let boundY = random(shapeSize);
                let Xs = [0 + random(0, 5), boundX, random(boundX, shapeSize), random(shapeSize)];
                let Ys = [0 + random(0, 5), boundY, random(boundY, shapeSize), random(shapeSize)];
                new ScanPoly([
                    {x: Xs[0], y: Ys[0]},
                    {x: Xs[1], y: Ys[1]},
                    {x: Xs[2], y: Ys[2]},
                    {x: Xs[3], y: Ys[3]},
                ], (width / numCols) * j, (height / numRows) * i, 0).displayShape();
            }
        }
    }
}