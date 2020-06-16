var fs = require('fs');
var readLine = require('readline');
let fileName;

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
    },
    startSaver: function() {
        fs.readFile(path.join(rootPath, 'lib', 'export.json'), function(err, data) {
            if (err) {
                callback(err);
            }

            let exportData = JSON.parse(data);
            for (project in exportData) {
                console.log(project);
                console.log(window.project_name);
                if (project == window.project_name) {
                    
                    let filePath = path.join(
                        rootPath,
                        'export',
                        project
                    );

                    let name = project + '-' + str(exportData[project].counter).padStart(4, '0');
                    if (!fs.existsSync(filePath)) {
                        fs.mkdirSync(filePath);
                    }

                    fileName = path.join(filePath, name);
                    save(fileName + '.svg');
                    //save(pathToFile + '.svg'); //
                    //saveCanvas(pathToFile + '.jpg');
                }
            }
        })
    },
    midPoint: function(x1, y1, x2, y2, ratio) {
        return {x: (x2 - x1) * ratio, y: (y2 - y1) * ratio};
    }
}