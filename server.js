var express = require('express');
var app = express();

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
    response.sendFile(__dirname + '/checkout.html');
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