/*
    Creator: rater193
    Creation date: 2021-12-31
    Description:
        This is a fileserver client to execute files from a fileserver in nodejs
        on the client, so you can use vs code to edit and execute code.
*/

//CONFIG
let config = {
    startupFile:       "startup.js",
    fileserverAddress: "localhost",
    fileserverPort:    1400
}


















//MODULE CODE
console.clear()
var socket = new WebSocket(`ws://${config.fileserverAddress}:${config.fileserverPort}`);
file = {
    filename:"",
    contents:""
}
loadFile = function(filename) {
    console.log("Loading file: " + filename);
    file = {
        filename:"",
        contents:""
    }
    let ret = new Promise(resolve => {
        let timeoutFunc = null;
        let resTest = resolve
        timeoutFunc = function() {
            //console.log("Loading file check: " + filename);
            if(file.filename==filename) {
                eval(file.contents);
                resTest("CONTENTSL " + filename);
            }else{
                setTimeout(timeoutFunc, 10);
            }
        }
        setTimeout(timeoutFunc, 10);
    });
    //Sending the request to the server
    let data = { state:"get", script: filename }         
    socket.send( JSON.stringify(data));
    
    return ret;
}

socket.onopen = function () {
    console.log("Connected, requesting file 2");
    
    loadFile("startup.js")
    .then(function() {
        console.log("File executed");
    });
;
};

socket.onmessage = function (message) {
    try {
        data = JSON.parse(message.data);
        switch(data.state) {
            case "file":
                try {
                    let filename = data.filename;
                    let contents = data.data;
                    file.filename = filename;
                    file.contents = contents;
                }catch(e) {
                    console.error(e);
                }
                break;
        }
    }catch(e) {
        console.error(e);    
    }
};