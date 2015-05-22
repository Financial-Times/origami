/*global require, console, process */
var http = require('http'),
    Url = require('url');

function getData(req, callback) {
    "use strict";

    if (req.method === "GET") {
        return callback(null, Url.parse(req.url, true).query);
    } else {
        var postData = "",
            error;

        req.on('data', function (data) {
            postData += data;

            if (postData.length > 1e6) {
                postData = "";
                error = 'Max data length reached';
            }
        });

        req.on('end', function () {
            callback(error, postData);
        });
    }
}

var server = http.createServer(function (req, res) {
    "use strict";

    getData(req, function (error, data) {
        if (error) {
          return console.error(error);
        }

        console.log('\nTAG');
        console.log(req.headers);
        console.log(data);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end();
});

var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    "use strict";
    console.log("Server listening on port %s", PORT);
});