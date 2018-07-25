class NumberedBox extends createjs.Container {
    constructor(game, number=0) {
        super();

        this.game = game;
        this.number = number;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;

        movieClip.numberText.font = "20px Oswald";
        movieClip.numberText.textBaseline = "alphabet";
        movieClip.numberText.x += 2;
        movieClip.numberText.y = 36;


        // animates size of boxes on hover
        new createjs.ButtonHelper(movieClip, 0, 1, 2, false, new lib.NumberedBox(), 3);


        this.addChild(movieClip);

        this.setBounds(0,0,50,50);

        // handle clicking
        this.on('click', this.handleClick.bind(this));
    }
    handleClick() {
        this.game.handleClick(this);
        createjs.Sound.play("Jump");
    
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
        return (this.currentNumber > this.amountOfBox);
    }
}



class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);
    
        this.loadSound();

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        this.stage.enableMouseOver();

        // add touch
        createjs.Touch.enable(this.stage);

        // retina screen (for mobile devices)
        this.retinalize();

        createjs.Ticker.setFPS(60);

        // game initialize
        this.gameData = new GameData();

        // redraws the stage at 60 frames per second
        createjs.Ticker.on("tick", this.stage);

        this.restartGame();
    }
        version() {
            return '1.0.0';
        }

        loadSound() {
            createjs.Sound.registerSound("soundsfx/jump7.aiff", "Jump");
            createjs.Sound.registerSound("soundsfx/game-over.aiff", "Game over");
            createjs.Sound.alternateExtensions = ["ogg", "wav"];
        }

        restartGame() {
            this.gameData.resetData();
            this.stage.removeAllChildren();
            this.stage.addChild(new lib.Background());
            this.generateMultipleBoxes(this.gameData.amountOfBox);

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

        handleClick(numberedBox) {
            if (this.gameData.isRightNumber(numberedBox.number)) {
                this.stage.removeChild(numberedBox);
                this.gameData.nextNumber();

                // gameover?
                if (this.gameData.isGameWin()) {
                    createjs.Sound.play("Game Over");

                    var gameOverView = new lib.GameOverView();
                    this.stage.addChild(gameOverView);

                    gameOverView.restartButton.on('click', (function(){
                        createjs.Sound.play("Jump");
                        this.restartGame();
                    }).bind(this));
                
                }
            }  
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