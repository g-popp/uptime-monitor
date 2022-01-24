/*
 * Title: Primary File for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    // Get the url and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the queryString as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Send the response
    res.end('Hello World\n');

    // log the request path
    console.log(
        'Path: ',
        trimmedPath,
        '\n Method: ',
        method,
        '\n Query Parameters: ',
        queryStringObject,
        '\n Headers: ',
        headers
    );
});

// Start the server, and have it listen on a PORT (default: 3000)
server.listen(process.env.PORT || 3000, function () {
    console.log('The server is listining on port, ', process.env.PORT || 3000);
});
