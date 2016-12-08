module.exports = {
    getResources : getResources,
    saveResources : saveResources,
    getUsers : getUsers
};

var jsonReader = require('./json-parser');

function getResources() {
    return jsonReader.loadJSON('./sampledata.json');
}

function saveResources(resourceJSON) {
    return jsonReader.writeJSON('./sampledata.json', resourceJSON);
}

function getUsers() {
    return jsonReader.loadJSON('./sampleUsers.json');
}