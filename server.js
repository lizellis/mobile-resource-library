var express = require('express');
var ejs = require('ejs');
var app = express();
    
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var cookieParser = require('cookie-parser');
app.use(cookieParser('thisisasecret'));

var handler = require('./js/tbd');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

app.get('/', function(request, response) {
    response = handler.createCookie(request, response);
    response = handler.setLocation(request, response);
    response.end();
});

app.get('/checkout', function(request, response) {
    var resource = handler.getResource(request.signedCookies.objectId);
    var users = require('./sampleUsers.json');
    if (resource) {
        response.render('checkout', {
            title: resource.title,
            author: resource.author,
            type: resource.type,
            users: users
        });
    } else {
        response.render('resourceNotFound');
    }
});

app.post('/checkout', function(request, response) {
    var resource = handler.getResource(request.signedCookies.objectId);
    var user = request.cookies.userId;
});

/*const server = http.createServer((req, res) => {
    var redirect = RedirectHandler(req);
    res = redirect.getServerResponse(res);
    console.log(res.statusCode);
    console.log(req.url);
    res.end();
});*/

app.listen(app.get('port'), function() {
  console.log('Server running...');
});