/*
 * Title: Primary File for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

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

    // Get the payload, if there is any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        var chosenHandler =
            typeof router[trimmedPath] !== 'undefined'
                ? router[trimmedPath]
                : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            trimmedPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer,
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {
            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof statusCode == 'number' ? statusCode : 200;

            // Use the payload returned from the handler, or set the default payload to an empty object
            payload = typeof payload == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
});

// Start the server
server.listen(process.env.PORT || config.PORT, function () {
    console.log(
        'The server is listining on port: ',
        process.env.PORT || config.PORT,
        '\nEnvironment: ',
        config.envName
    );
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
    // Callback a http status code, and a payload object
    callback(406, { name: 'sample handler' });
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};

// Define a request router
var router = {
    sample: handlers.sample,
};
