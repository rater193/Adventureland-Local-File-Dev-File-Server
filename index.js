console.log("Starting server");
const fs = require("fs");

var server = require('websocket').server, http = require('http');

var socket = new server({  
    httpServer: http.createServer().listen(1400)
});

socket.on('request', function(request) {  
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {

        try {
            let data = JSON.parse(message.utf8Data);
            switch(data.state) {
                case "getScripts":
                    let scripts = {}
                    connection.sendUTF('hello');
                break;

                case "get":
                    let filename = "./client/"+data.script;
                    let filedata = fs.readFileSync(filename);

                    connection.sendUTF(JSON.stringify({
                        "state":"file",
                        "filename":data.script,
                        "data":""+filedata
                    }));
                    console.log("Sending data: " + filename);
                    console.log(""+filedata);
                break;

                default:
                    console.error("Unhandled state: " + data.state);
                break;
            }
        }catch(e) {
            console.log(e);
        }

    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
    connection.on('error', function(err) {
        console.error(err);
    });
});