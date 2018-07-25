class NumberedBox extends createjs.Container {
    constructor(number=0) {
        super();

        var movieClip = new locationbar.NumberedBox();
    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.stage);
    
    }
        version(){
            return '1.0.0';
        }
    }
    
//starts game
    var game = new Game();