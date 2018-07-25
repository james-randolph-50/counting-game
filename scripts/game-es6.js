class NumberedBox extends createjs.Container {
    constructor(number=0) {
        super();

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        this.setBounds(0,0,50,50);

    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        createjs.Ticker.setFPS(60);

        // redraws the stage at 60 frames per second
        createjs.Ticker.on("tick", this.stage);

        this.stage.addChild(new lib.Background());

        this.stage.addChild(new NumberedBox(69));
    
    }
        version(){
            return '1.0.0';
        }
        generateMultipleBoxes(amount=10) {
            for (var i=amount; i>0; i--) {
                var movieClip = new NumberedBox(i);
                this.stage.addChild(movieClip);

                
        // randomly place
        movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
        movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
            }
        }

    }
    
//starts game
    var game = new Game();