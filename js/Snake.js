import InputManager from "./InputManager.js";
import FoodManager from "./FoodManager.js";
import OverlayManager from "./OverlayManager.js";
import ScoreManager from "./ScoreManager.js";
import SoundManager from "./SoundManager.js";

class Snake {
    gameArea = {x: 21, y: 21};
    snakeStart = {x: 11, y: 11};
    speedEasy = 2;
    speedNormal = 2;
    speedHard = 5;
    
    snakeBody = [];
    snakeSpeed = 0;
    lastRenderTime = 0;
    running = false;
    moving = false;
    paused = false;
    gameOver = false;
    level = 0;
    difficult = 0;

    constructor (gameBoard, overlay, levelDisplay, loggedUser = null) {
        if (!gameBoard) {
            throw new Error("Impossibile procedere: gameBoard non trovata");
        }

        this.gameBoard = gameBoard;

        this.myInputManager = new InputManager();
        this.myFoodManager = new FoodManager(this.gameArea);
        this.myOverlayManager = new OverlayManager(overlay);
        this.myScoreManager = new ScoreManager(levelDisplay, loggedUser);
        this.mySoundManager = new SoundManager();

        this.myScoreManager.readLocalScore();
        this.mySoundManager.loadSounds();
    }

    clearGameBoard () {
        this.gameBoard.innerHTML = "";
    }

    deleteSavedScore () {
        this.myScoreManager.clearScore();
    }

    drawFood () {
        this.myFoodManager.draw(this.gameBoard);
    }

    drawSnake () {
        this.snakeBody.forEach(pos => {
            const snakeElement = document.createElement('div');

            snakeElement.style.gridRowStart = pos.y;
            snakeElement.style.gridColumnStart = pos.x;
            snakeElement.classList.add("snake");

            this.gameBoard.appendChild(snakeElement);
        });
    }

    endGame () {
        this.level = 0;
        this.running = false;
        this.moving = false;
        this.paused = false;
        this.gameOver = false;
        this.snakeSpeed = 0;
        this.snakeBody.length = 0;

        this.clearGameBoard();
        this.myInputManager.setInputEnabled(false);
        this.myInputManager.resetInputDirection();
        this.myScoreManager.updateLevelDisplay();
        this.myOverlayManager.clearOverlay();
    }

    getDifficult () {
        return this.difficult;
    }

    growSnake () {
        const snakeX = this.snakeBody[0].x;
        const snakeY = this.snakeBody[0].y;

        this.snakeBody.push({x: snakeX, y: snakeY});
    }

    isOnSnake (pos = {x: 0, y: 0}) {
        const snakeX = this.snakeBody[0].x;
        const snakeY = this.snakeBody[0].y;

        return pos.x === snakeX && pos.y === snakeY;
    }

    isOutOfMap (pos = {x: 0, y: 0}) {
        return pos.x > this.gameArea.x || pos.x < 1 || pos.y > this.gameArea.y || pos.y < 1;
    }

    isMoving () {
        return this.moving;
    }

    isPaused () {
        return this.paused;
    }

    isRunning () {
        return this.running;
    }

    isGameOver () {
        return this.gameOver;
    }

    move(key = "") {
        this.myInputManager.processKey(key);
    }

    newFood () {
        this.myFoodManager.update(-1);
    }

    resetSnakeBody () {
        this.snakeBody.length = 0;
        this.snakeBody.push(this.snakeStart);
    }

    resetSnakeSpeed () {
        if (this.difficult >= 2) {
            this.snakeSpeed = this.speedHard;
        } else if (this.difficult === 1) {
            this.snakeSpeed = this.speedNormal;
        } else {
            this.snakeSpeed = this.speedEasy;
        }

        console.log('speed:' + this.snakeSpeed);
    }

    run (currentTime) {
        const secondSinceLastRender = (currentTime - this.lastRenderTime) / 1000;

        if (secondSinceLastRender > 1 / this.snakeSpeed) {
            this.lastRenderTime = currentTime;

            if (!this.paused) {
                this.updateSnake();
                this.updateOverlay();
                this.updateSnakeBodyCollision();
                this.updateFoodCollision();
            }

            this.clearGameBoard();
            this.drawSnake();
            this.drawFood();
        }

        if (this.running) {
            window.requestAnimationFrame(this.run.bind(this));
        }
    }

    start () {
        if (!this.running) {
            this.lastRenderTime = 0;
            this.running = true;
            this.level = 1;

            this.myInputManager.setInputEnabled(true);
            this.myScoreManager.updateLevelDisplay(this.level);

            this.resetSnakeBody();
            this.resetSnakeSpeed();
            this.newFood();

            window.requestAnimationFrame(this.run.bind(this));
        }

        if (this.paused) {
            this.setPaused(false);
        }

        this.mySoundManager.playButtonClick();
    }

    stop () {
        const score = this.level - 1;

        this.running = false;
        this.moving = false;
        this.gameOver = true;

        this.myInputManager.setInputEnabled(false);
        this.myInputManager.resetInputDirection();
        this.myScoreManager.setLastScore(score, this.difficult);
        this.myScoreManager.updateLevelDisplay();
        this.mySoundManager.playGameOver();

        this.updateOverlay();
    }

    setDifficult(difficult = 0) {
        if (!this.running) {
            this.difficult = difficult;
            console.log("difficult:" + this.difficult);
        }
    }

    setPaused (pause = true) {
        this.paused = pause;
        this.myInputManager.setInputEnabled(!pause);
    }

    switchToNextLevel () {
        this.level += 1;

        if (this.difficult >= 2) {
            this.snakeSpeed += 0.2;
        } else {
            this.snakeSpeed += 0.1;
        }

        this.newFood();
        this.growSnake();
        
        this.myScoreManager.updateLevelDisplay(this.level);
        this.mySoundManager.playEatFood();
    }

    updateFoodCollision () {
        const foodList = this.myFoodManager.getFoodList();

        foodList.forEach(pos => {
            if (this.isOnSnake(pos)) {
                this.switchToNextLevel();
            }
        });
    }

    updateOverlay () {
        if (this.moving) {
            this.myOverlayManager.clearOverlay();
            return;
        }

        const highScore = this.myScoreManager.getHighScore(this.difficult);
        this.myOverlayManager.showOverlay(this.gameOver, this.level, highScore);
    }

    updateSnakeBodyCollision () {
        if (!this.moving) {
            return;
        }

        for (let i = 0; i < this.snakeBody.length - 1; i++) {
            let pos = this.snakeBody[i + 1];

            if (this.isOnSnake(pos)) {
                this.stop();
            }
        };
    }

    updateSnake () {
        const inputDirection = this.myInputManager.getInputDirection();

        this.moving = (inputDirection.x !== 0) || (inputDirection.y !== 0);
    
        for (let i = this.snakeBody.length - 2; i >= 0; i--) {
            this.snakeBody[i + 1].x = this.snakeBody[i].x;
            this.snakeBody[i + 1].y = this.snakeBody[i].y;
        }

        const snakeHead = {x: this.snakeBody[0].x, y: this.snakeBody[0].y};

        snakeHead.x += inputDirection.x;
        snakeHead.y += inputDirection.y;

        if (this.difficult === 0) {

            if (snakeHead.x > this.gameArea.x) {
                snakeHead.x = 1;
            } else if (snakeHead.x < 1) {
                snakeHead.x = this.gameArea.x;
            }
    
            if (snakeHead.y > this.gameArea.y) {
                snakeHead.y = 1;
            } else if (snakeHead.y < 1) {
                snakeHead.y = this.gameArea.y;
            }

        } else {

            if (this.isOutOfMap(snakeHead)) {
                this.stop();
            }

        }

        this.snakeBody[0] = snakeHead;
    }
    
}

export default Snake;