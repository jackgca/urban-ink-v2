class BezierLine {
    constructor(line_size, num_lines) {
        this.coords = [
            -line_size,
            line_size,
            line_size,
            line_size
        ];
        this.num_lines = num_lines;
    }

    makeShape() {
        push();
        for (var i = 0; i < this.num_lines; i++) {
            let n = noise(i, i+10) * 10 * (i < this.num_lines/2 ? -1 : 1);
            bezier(
                this.coords[0], this.coords[1],
                this.coords[0]*n, this.coords[1]*n,
                this.coords[2]*n, this.coords[3]+n,
                this.coords[2], this.coords[3]
            );
        }
        pop();
    }
}

class BezierLines {
    constructor(line_size, num_lines) {
        this.colors = [
            [3, 70, 90, 1],
            [45, 70, 90, 1],
            [201, 82, 93, 1]
        ];
        this.line_size = line_size;
        this.num_lines = num_lines;
    }

    run() {
        let color_count = 0;
        let newLine;

        for (var i = 0; i < 5; i++) {
            stroke(this.colors[color_count]);
            noiseSeed(config.seed+(i*2));
            newLine = new BezierLine(this.line_size, this.num_lines);
            newLine.makeShape();
            color_count++;
            if (color_count == this.colors.length) color_count = 0;
        }
    }
}

module.exports = BezierLines;