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
    if (resource) {
        response.render('checkout', {
            title: resource.title,
            author: resource.author,
            type: resource.type,
        });
    } else {
        response.render('resourceNotFound');
    }
});

app.post('/checkout', function(request, response) {
    var resource = handler.getResource(request.signedCookies.objectId);
    resource.rentedBy = request.cookies.userId;
    handler.rentResource(resource);
    response.render('thankYou', { 
        title: resource.title,
        author: resource.author,
        type: resource.type,
        action : 'checking out'
    });
});

app.get('/return', function(request, response) {
    var resource = handler.getResource(request.signedCookies.objectId);
    var user = handler.getUser(resource.rentedBy);
    if (resource) {
        response.render('return', {
            title: resource.title,
            author: resource.author,
            type: resource.type,
            user: user.firstName + ' ' + user.lastName
        });
    } else {
        response.render('resourceNotFound');
    }
});

app.post('/return', function(request, response) {
    var resource = handler.getResource(request.signedCookies.objectId);
    resource.rentedBy = null;
    handler.rentResource(resource);
    response.render('thankYou', { 
        title: resource.title,
        author: resource.author,
        type: resource.type,
        action : 'returning'
    });
});

app.listen(app.get('port'), function() {
  console.log('Server running...');
});