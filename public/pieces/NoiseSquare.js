class NoiseSquare {

    /** 
    *   @param  {object}    xy      Object with x and y properties of a coordinate
    *   @param  {number}    size    Size (length of one side) of the square
    */

    constructor(xy, size) {
        this.corners = {
            topLeft: {x: xy.x, y: xy.y},
            topRight: {x: xy.x + size, y: xy.y},
            botLeft: {x: xy.x, y: xy.y + size},
            botRight: {x: xy.x + size, y: xy.y + size}
        }
        
        for (var coords in this.corners) {
            let new_xy = this.corners[coords];
            this.corners[coords].x += size * noise(new_xy.x, new_xy.y);
            this.corners[coords].y += size * noise(new_xy.x, new_xy.y);
        }
    }

    get() {
        return this.corners;
    }

    displaySquare() {
        push();
        quad(
            this.corners.topLeft.x, this.corners.topLeft.y,
            this.corners.topRight.x, this.corners.topRight.y,
            this.corners.botRight.x, this.corners.botRight.y,
            this.corners.botLeft.x, this.corners.botLeft.y
        );
        pop();
    }
}

module.exports = {
    example1: function() {
        noFill();
        let xcells = width/6;
        let ycells = height/6;
        for (var h = 0; h < 4; h++) {
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j < 10; j++) {
                    new NoiseSquare({x: (i * xcells) + h, y: (ycells * j) + h}, 30).displaySquare();
                }
            }
        }
    },
    example2: function() {
        for (var i = 0; i < 50; i++) {
            new NoiseSquare({x: (width / 2) + i, y: (height / 2) + i}, 50 - i).displaySquare();
        }
    }
}