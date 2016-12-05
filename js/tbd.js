module.exports = {
    createCookie : function createCookie(request, response) {
        for (var urlParam in request.query) {
            response.cookie(urlParam, request.query[urlParam], {
                signed: true
            });
        }
        return response;
    },
    setLocation : function setLocation(request, response) {
        var newPath = getRedirectUrl(request.path);
        console.log(newPath);
        console.log(request.path);
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



