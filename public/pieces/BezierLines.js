class BezierLine {
    constructor(line_size, num_lines) {
        this.coords = [
            -line_size,
            -line_size,
            -line_size,
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
                this.coords[0]-n, this.coords[1]*n,
                this.coords[2]*n, this.coords[3]+n,
                this.coords[2], this.coords[3]
            );
        }
        pop();
    }
}

module.exports = BezierLine;