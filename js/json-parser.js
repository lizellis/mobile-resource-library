module.exports = {
    loadJSON : loadJSON,
    writeJSON : writeJSON
};

var fs = require('fs');

function loadJSON(filepath) {
    var fileData = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(fileData);
}

function writeJSON(filepath, jsonData) {
    var jsonString = JSON.stringify(jsonData);
    fs.writeFileSync(filepath, jsonString);
}