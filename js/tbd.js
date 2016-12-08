module.exports = {
    createCookie : createCookie,
    getResource : getResource,
    rentResource : rentResource,
    getUser : getUser,
    setLocation : setLocation
};

var DA = require('./data-accessor');

function createCookie(request, response) {
    for (var urlParam in request.query) {
        response.cookie(urlParam, request.query[urlParam], {
            signed: true
        });
    }
    return response;
}

function getResource(objectId) {
    var sampleData = DA.getResources();
    for (var i =0; i < sampleData.length; i++) {
        if (sampleData[i].id === objectId) {
            return sampleData[i];
        }
    }
}

function rentResource(resource, user) {
    var sampleData = DA.getResources();
    for (var i = 0; i < sampleData.length; i++) {
        if (sampleData[i].id === resource.id) {
            sampleData[i] = resource;
        }
    }
    DA.saveResources(sampleData);
}

function getUser(userId) {
    var users = DA.getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            return users[i];
        }
    }
}

function setLocation(request, response) {
    var newPath = getRedirectUrl(request.query.objectId);
    if (newPath) {
        response.redirect(newPath);
    }
    return response;
}

function getRedirectUrl(objectId) {
    if (objectId) {
        var resource = getResource(objectId);
        if (resource) {
            if (resource.rentedBy) {
                return '/return';
            } else {
                return '/checkout';
            }
        }
    }
}



