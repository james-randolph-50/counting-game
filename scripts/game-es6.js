class NumberedBox extends createjs.Container {
    constructor(game, number=0) {
        super();

        this.game = game;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        this.setBounds(0,0,50,50);

        // handle clicking
        this.on('click', this.handleClick.bind(this));
    }
    handleClick() {
        this.game.handleClick(this);
    
    }
}

class GameData {
    constructor() {
        this.amountOfBox = 20;
        this.resetData();
    }
    resetData() {
        this.currentNumber = 1;
    }
    nextNumber() {
        this.currentNumber += 1;
    }
    isRightNumber(number) {
        return (number === this.currentNumber);
    }
    isGameWin() {
        return false;
    }
}



class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        // add touch
        createjs.Touch.enable(this.stage);

        // retina screen (for mobile devices)
        this.retinalize();

        createjs.Ticker.setFPS(60);

        // game initialize
        this.gameData = new GameData();

        // redraws the stage at 60 frames per second
        createjs.Ticker.on("tick", this.stage);

        this.stage.addChild(new lib.Background());

        this.generateMultipleBoxes();
    
    }
        version() {
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
            if (this.gameData.isRightNumber(numberedBox, number))
            this.stage.removeChild(NumberedBox);
        }

        retinalize() {
            this.stage.width = this.canvas.width;
            this.stage.height = this.canvas.height;

            let ratio = window.devicePixelRatio;
            if (ratio === undefined) {
                return;
            }

            this.canvas.setAttribute('width', Math.round( this.stage.width * ratio ));
            this.canvas.setAttribute('height', Math.round( this.stage.height * ratio ));

            this.stage.scaleX = this.stage.scaleY = ratio;

            // CSS style
            this.canvas.style.width = this.stage.width + "px";
            this.canvas.style.height = this.stage.height + "px";
        }

    }
    
//starts game
    var game = new Game();