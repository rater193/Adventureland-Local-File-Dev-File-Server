
//This is the list of files to load
files = [
    "libs/api.js"
];

//this iterates through the array and loads all the files in order
function waitForFiles(funcToExecuteOnFinishLoad) {
    if(files.length>0) {
        let filename = files.shift();
        loadFile(filename)
        .then(function() {
            waitForFiles(funcToExecuteOnFinishLoad);
        });
    }else{
        funcToExecuteOnFinishLoad();
    }
}


//Here we are loading all the initial files, then executing the main basic attack
waitForFiles(function() {
    //loadFile("attackPaterns/targetSlimes.js");
    /*
    smart_move("main").then(function() {
        follower.waitForPlayer("RatRanger2").then(function() {
            console.log("Found RatRanger2");
            follower.waitForPlayer("RatMage").then(function() {
                console.log("Found RatMage");
                setTimeout(function() {
                    accept_party_request("RatRanger2")
                    accept_party_request("RatMage")
                    let id = 1;
                    //Here we are going to start moving as a group
                    add_bottom_button(id++, "Goo", function() {
                        loadFile("attackPaterns/targetSlimes.js");
                    })
                    add_bottom_button(id++, "Croc", function() {
                        loadFile("attackPaterns/targetGators.js");
                    })
                    add_bottom_button(id++, "Bee", function() {
                        loadFile("attackPaterns/targetBee.js");
                    })
                }, 2000);
            });
        });
    });;
    */
    loadFile("attackPaterns/targetSlimes.js");
});
