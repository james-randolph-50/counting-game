"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberedBox = function (_createjs$Container) {
    _inherits(NumberedBox, _createjs$Container);

    function NumberedBox(game) {
        var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, NumberedBox);

        var _this = _possibleConstructorReturn(this, (NumberedBox.__proto__ || Object.getPrototypeOf(NumberedBox)).call(this));

        _this.game = game;
        _this.number = number;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;

        movieClip.numberText.font = "20px Oswald";
        movieClip.numberText.textBaseline = "alphabet";
        movieClip.numberText.x += 2;
        movieClip.numberText.y = 36;

        // animates size of boxes on hover
        new createjs.ButtonHelper(movieClip, 0, 1, 2, false, new lib.NumberedBox(), 3);

        _this.addChild(movieClip);

        _this.setBounds(0, 0, 50, 50);

        // handle clicking
        _this.on('click', _this.handleClick.bind(_this));
        return _this;
    }

    _createClass(NumberedBox, [{
        key: "handleClick",
        value: function handleClick() {
            this.game.handleClick(this);
            createjs.Sound.play("Jump");
        }
    }]);

    return NumberedBox;
}(createjs.Container);

var GameData = function () {
    function GameData() {
        _classCallCheck(this, GameData);

        this.amountOfBox = 20;
        this.resetData();
    }

    _createClass(GameData, [{
        key: "resetData",
        value: function resetData() {
            this.currentNumber = 1;
        }
    }, {
        key: "nextNumber",
        value: function nextNumber() {
            this.currentNumber += 1;
        }
    }, {
        key: "isRightNumber",
        value: function isRightNumber(number) {
            return number === this.currentNumber;
        }
    }, {
        key: "isGameWin",
        value: function isGameWin() {
            return this.currentNumber > this.amountOfBox;
        }
    }]);

    return GameData;
}();

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        console.log("Welcome to the game. Version " + this.version());

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

    _createClass(Game, [{
        key: "version",
        value: function version() {
            return '1.0.0';
        }
    }, {
        key: "loadSound",
        value: function loadSound() {
            createjs.Sound.registerSound("soundsfx/jump7.aiff", "Jump");
            createjs.Sound.registerSound("soundsfx/game-over.aiff", "Game over");
            createjs.Sound.alternateExtensions = ["ogg", "wav"];
        }
    }, {
        key: "restartGame",
        value: function restartGame() {
            this.gameData.resetData();
            this.stage.removeAllChildren();
            this.stage.addChild(new lib.Background());
            this.generateMultipleBoxes(this.gameData.amountOfBox);
        }
    }, {
        key: "generateMultipleBoxes",
        value: function generateMultipleBoxes() {
            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            for (var i = amount; i > 0; i--) {
                var movieClip = new NumberedBox(this, i);
                this.stage.addChild(movieClip);

                // randomly place
                movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
                movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick(numberedBox) {
            if (this.gameData.isRightNumber(numberedBox.number)) {
                this.stage.removeChild(numberedBox);
                this.gameData.nextNumber();

                // gameover?
                if (this.gameData.isGameWin()) {
                    createjs.Sound.play("Game Over");

                    var gameOverView = new lib.GameOverView();
                    this.stage.addChild(gameOverView);

                    gameOverView.restartButton.on('click', function () {
                        createjs.Sound.play("Jump");
                        this.restartGame();
                    }.bind(this));
                }
            }
        }
    }, {
        key: "retinalize",
        value: function retinalize() {
            this.stage.width = this.canvas.width;
            this.stage.height = this.canvas.height;

            var ratio = window.devicePixelRatio;
            if (ratio === undefined) {
                return;
            }

            this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
            this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

            this.stage.scaleX = this.stage.scaleY = ratio;

            // CSS style
            this.canvas.style.width = this.stage.width + "px";
            this.canvas.style.height = this.stage.height + "px";
        }
    }]);

    return Game;
}();

//starts game


var game = new Game();