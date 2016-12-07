module.exports = {
    createCookie : function createCookie(request, response) {
        for (var urlParam in request.query) {
            response.cookie(urlParam, request.query[urlParam], {
                signed: true
            });
        }
        return response;
    },
    getResource : function getResource(objectId) {
        var sampleData = require('./../sampledata.json');
        for (var i =0; i < sampleData.length; i++) {
            if (sampleData[i].id === objectId) {
                return sampleData[i];
            }
        }
    },
    setLocation : function setLocation(request, response) {
        var newPath = getRedirectUrl(request.path);
        if (newPath !== request.path) {
            response.writeHead(302, {
                Location : newPath
            });
        }
        return response;
        
        function getRedirectUrl(urlPath) {
            if (urlPath === '/') {
                return '/checkout';
            }
            else return urlPath;
        }
    }
}



