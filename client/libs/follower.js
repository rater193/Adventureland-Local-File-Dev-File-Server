


console.log("Loading follower.js");
follower = {}

let targetPlayername = "";
follower.guard = function(playername) {
    targetPlayername = playername;
}

follower.start = function() {
    setInterval(function() {
        if(!is_on_cooldown("regen_hp") && character.hp < character.max_hp-50) {
            use('regen_hp');
        }
        if(!is_on_cooldown("regen_mp") && character.mp < character.max_mp) {
            use('regen_mp');
        }
        let player = get_player(targetPlayername);
        loot();
        if(player) {
            let target = get_target_of(player);
            if(target) {
                if(can_attack(target))
                {
                    attack(target);
                }
            }
            move(
                player.x,
                player.y
            );
        }
    }, 1000/20);
}

follower.waitForPlayer = function(playername) {
    let ret = new Promise(resolve => {
        let timeoutFunc = null;
        let resTest = resolve
        console.log("Waiting for player, " + playername);
        timeoutFunc = function() {
            //console.log("Loading file check: " + filename);
            let player = get_player(playername);
            if(player) {
                console.log("Found player: " + playername);
                resTest("CONTENTSL " + filename);
            }else{
                setTimeout(timeoutFunc, 100);
            }
        }
        setTimeout(timeoutFunc, 100);
    });


    return ret
}