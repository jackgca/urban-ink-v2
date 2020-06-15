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
            let n = random() * noise(i, i+10) * 40 * (i < this.num_lines/2 ? -1 : 1);
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
    constructor(line_size, num_lines, colors) {
        this.colors = colors;
        this.line_size = line_size;
        this.num_lines = num_lines;
    }

    run() {
        let color_count = 0;
        let newLine;
        for (var i = 0; i < 5; i++) {
            push();
            strokeWeight(2);
            let c = this.colors[floor(random(0, 4))]
            stroke(c);
            noFill();
            //noiseSeed(config.seed+(i*2));
            newLine = new BezierLine(this.line_size, this.num_lines);
            newLine.makeShape();
            pop();
        }
    }
}

module.exports = {
    example: function() {
        let wcells = 8;
        let hcells = 4;
        let count = 0;

        for (var i = 0; i < wcells; i++) {
            for (var j = 0; j < hcells; j++) {
                count++;
                push();
                //noFill();
                translate(
                    (width/wcells * i) + (width/wcells/2),
                    height/hcells * j + (height/hcells/2)
                );
                //rotate(randomGaussian(0, 20));
                let colors = [
                    [260, 45, 16],
                    [69, 12, 64],
                    [35, 67, 82],
                    [21, 67, 95],
                    [20, 70, 73]
                ];

                colors = [
                    [64, 21, 85],
                    [171, 21, 75],
                    [221, 48, 81],
                    [239, 53, 74],
                    [259, 57, 37]
                ];

                new BezierLines(2, count / 2, colors).run();
                pop();
            }
        }
    },
    BezierLines,
    BezierLine
}