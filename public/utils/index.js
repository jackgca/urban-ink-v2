module.exports = {
    loadPiece: function(pieceName) {
        window[pieceName] = require(window.__dirname + '\\pieces\\' + pieceName + '.js');
    }
}