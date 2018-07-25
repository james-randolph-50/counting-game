class NumberedBox extends createjs.Container {
    constructor(number=0) {
        super();

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        // randomly place
        movieClip.x = Math.random() * 200;
        movieClip.y = Math.random() * 200;
    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(60);

        // redraws the stage at 60 frames per second
        createjs.Ticker.on("tick", this.stage);

        this.stage.addChild(new lib.Background());

        this.stage.addChild(new NumberedBox(69));
    
    }
        version(){
            return '1.0.0';
        }
    }
    
//starts game
    var game = new Game();