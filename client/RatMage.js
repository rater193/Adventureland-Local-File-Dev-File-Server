
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

let playername = "RatRanger";

//Here we are loading all the initial files, then executing the main basic attack
waitForFiles(function() {
    /*
    let player = get_player(playername);
    //loadFile("attackPaterns/targetSlimes.js");
    if(player) {
        follower.guard(playername);
        follower.start();
        send_party_request(playername);
    }else{
        //Unable to find the player, so we will move to a known starting location
        smart_move("main").then(function() {
            follower.waitForPlayer(playername).then(function() {
                follower.guard(playername);
                follower.start();
                send_party_request(playername);
            });
        });;
    }
    */
    loadFile("attackPaterns/targetSlimes.js");
});
