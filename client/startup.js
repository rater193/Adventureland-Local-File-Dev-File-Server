
//This is the list of files to load
files = [
    "libs/api.js",
    //"other/vox.js",
    //"other/minimap.js"
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

try{cvs.destroy({children:true})}catch(ex){}

//Here we are loading all the initial files, then executing the main basic attack
waitForFiles(function() {
    //loadFile("basicAttack.js");
        //[...document.getElementsByClassName("codeui")].map(n => n && n.remove());
        //console.log(document.getElementsByClassName("codeui")).remove();
        let wtl = function(x, y, scale) {
            var relativeX = (character.real_x - x)*scale * -1;
            var relativeY = (character.real_y - y)*scale * -1;
            
            return {x: relativeX, y: relativeY};
        }

        cvs = null;
        setInterval(function() {
            try{cvs.destroy({children:true})}catch(ex){}
            
            //cvs=PIXI.autoDetectRenderer();
            //let renderTexture = PIXI.RenderTexture.create({ width: 800, height: 600 });
            cvs=new PIXI.Graphics();
            cvs.zIndex = 999;
            /*
            let sprite = PIXI.Sprite.from("spinObj_01.png");

            sprite.position.x = 800/2;
            sprite.position.y = 600/2;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            //cvs.render(sprite, {renderTexture});
            */

            var color=0x47474F;
            var size= 4;
            cvs.lineStyle(size, color);
            cvs.beginFill(0x40420);
            cvs.drawCircle(160, 300, 64);
            cvs.endFill();

			parent.stage.addChild(cvs);
			//parent.miniMap.push(cvs);
        }, 100);
});
