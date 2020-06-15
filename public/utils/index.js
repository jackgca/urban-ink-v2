var fs = require('fs');
var readLine = require('readline');

module.exports = {
    loadPiece: function(pieceName) {
        window[pieceName] = require(window.__dirname + '/pieces/' + pieceName + '.js');
    },
    textFileToArray: function(filePath, callback) {

        var textArray = [];

        var dict = fs.createReadStream(filePath);

        var remaining = '';

        dict.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > 1) {
                var line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                textArray.push(line);
                index = remaining.indexOf('\n');
            }
        });

        dict.on('end', function() {
            if (remaining.length > 0) {
                textArray.push(line);
                callback(null, textArray);
            }
        });
    }
}