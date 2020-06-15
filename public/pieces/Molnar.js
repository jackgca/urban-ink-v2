let utils = require('../utils/index.js');

class WordCatalog {
    constructor(path) {
        this.path = path;
        this.numLines = 0;
        this.words;
    }

    buildCatalog(callback) {
        utils.textFileToArray(this.path, function(err, dict) {
            if (err) {
                return callback(err);
            }
            callback(null, dict);
        })
    }

    getNumLines(callback) {
        console.log('getting number of lines');
        utils.numLines(this.path, function(err, numLines) {
            if (err) {
                return callback(err);
            }
            callback(null, numLines);
        });
    }
}

class RandomWord {
    constructor(path, color, size, lineNumber) {
        this.path = path;
        this.color = color;
        this.size = size;
        this.lineNumber = lineNumber;
        this.text;
    }

    getText(callback) {
        console.log('getting word');
        utils.returnLine(this.path, this.lineNumber, function(err, word) {
            if (err) {
                return callback(err);
            }
            callback(null, word);
        });
    }
}

function splitWord(word, x1, y1, splitFactor, constantSplit) {
    let interval;
    if (constantSplit) {
        interval = splitFactor;
    } else {
        interval = floor(word.length / (splitFactor || 3));
    }

    for (var i = 0; i < word.length; i += interval) {
        displayText(word.substring(i, i + interval));
    }
}

function displayText(inputText, x, y) {
    let randx;
    let randy;
    push();
    if (!x) {
        randx = random(0, width);
    }
    if (!y) {
        randy = random(0, height);
    }
    translate(x || randx, y || randy);
    rotate(randomGaussian(0, 1));
    text(inputText, 0, 0);
    pop();
}

function randomLines(numLines) {
    for (var i = 0; i < numLines; i++) {
        let length = random(40, width);
        let x1 = random(0, width);
        let y1 = random(0, height);
        let x2;
        let y2;
        let horizontal = (random() > 0.5) ? true : false;
        push()
        strokeWeight((random() > 0.5 ? 1 : 2))

        if (horizontal) {
            y2 = y1;
            x2 = random(0, width);
        } else {
            x2 = x1;
            y2 = random(0, height);
        }
        translate(x1, y1);
        let angle = randomGaussian(0, 1);
        rotate(angle);
        line(0, 0, x2-x1, y2-y1);
        pop();
    }
}

function movePixel(x1, y1, x2, y2) {
    set(x2, y2, get(x1, y1));
    set(x1, y1, color('white'));
}

function moveRect(x1, y1, x2, y2, w, h) {
    loadPixels();
    for (var i = x1; i < w + x1; i++) {
        for (var j = y2; j < h + y1; j++) {
            movePixel(i, j, x2 + i, y2 + j);
        }
    }
    updatePixels();
}

module.exports = {
    example: function() {

        let pathToFile = window.__dirname + '/../lib/text/words_alpha.txt';
        let catalog = new WordCatalog(pathToFile);

        catalog.buildCatalog(function(err, dict) {
            for (var i = 0; i < 5; i++) {
                splitWord(dict[floor(random(0, dict.length))], null, null, 3, false);
                randomLines(5);

                let x1 = random(0, width);
                let y1 = random(0, height);
                let x2 = random(0, width - x1) + x1;
                let y2 = random(0, height - y1) + y1;
                let w = random(0, width/3);
                let h = random(0, height/3);

                //moveRect(x1, y1, x2, y2, w, h);
            }

            
        });

    },
    RandomWord,
    WordCatalog
}