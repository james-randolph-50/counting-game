class NumberedBox extends createjs.Container {
    constructor(game, number=0) {
        super();

        this.game = game;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        this.setBounds(0,0,50,50);

        // handle clicking (or tapping)
        this.on('click', this.handleClick.bind(this));
    }
    handleClick() {
        this.game.handleClick(this);
    
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

        this.generateMultipleBoxes();
    
    }
        version(){
            return '1.0.0';
        }
        generateMultipleBoxes(amount=10) {
            for (var i=amount; i>0; i--) {
                var movieClip = new NumberedBox(this, i);
                this.stage.addChild(movieClip);

                
        // randomly place
        movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
        movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
            }
        }

        handleClick(NumberedBox) {
            this.stage.removeChild(NumberedBox);
        }

    }
    
//starts game
    var game = new Game();