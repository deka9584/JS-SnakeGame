import Menu from "./Menu.js";
import Snake from "./Snake.js";

const _app = {};

_app.arrowBoard_clickHandler = (event) => {
    if (_app.mySnake) {
        const key = event.target.dataset.key;

        if (key == "_center") {
            _app.escape();
        } else {
            _app.mySnake.move(key);
        }
    }
}

_app.escape = () => {
    if (_app.myMenu && _app.mySnake) {
        const running = _app.mySnake.isRunning();
        const gameOver = _app.mySnake.isGameOver();

        if (running) {
            _app.mySnake.setPaused(true);
            _app.myMenu.showPauseMenu();
            _app.hideArrowBoard();
        } else if (gameOver) {
            _app.stopGame();
        }
    }
}

_app.hideArrowBoard = () => {
    if (_app.arrowBoard) {
        _app.arrowBoard.classList.add("hidden");
    }
}

_app.overlay_clickHandler = () => {
    _app.escape();
}

_app.window_keyupHandler = (event) => {
    if (event.key == "Escape") {
        _app.escape();
    }
}

_app.resetGameData = () => {
    if (_app.mySnake) {
        _app.mySnake.deleteSavedScore();
    }
}

_app.resetScoreBtn_clickHandler = () => {
    const message = `Vuoi cancellare tutti i tuoi punteggi?\nQuesta operazione è irreversibile.`;

    if (confirm(message)) {
        _app.resetGameData();
        _app.stopGame();
        alert("Punteggi rimossi.");
    }
}

_app.setupGamePage = () => {
    const menuContainer = document.querySelector("#menu");
    _app.myMenu = new Menu(menuContainer);

    const overlay = document.querySelector("#overlay");
    if (overlay) {
        overlay.addEventListener('click', _app.overlay_clickHandler);
    }

    const levelDisplay = document.querySelector("#levelDisplay");
    const gameBoard = document.querySelector("#gameBoard");
    _app.mySnake = new Snake(gameBoard, overlay, levelDisplay);

    _app.myMenu.generateMenu();

    const startGameBtn = _app.myMenu.getStartGameBtn();
    if (startGameBtn) {
        startGameBtn.addEventListener('click', _app.startGameBtn_clickHandler);
    }

    const stopGameBtn = _app.myMenu.getStopGameBtn();
    if (stopGameBtn) {
        stopGameBtn.addEventListener('click', _app.stopGameBtn_clickHandler);
    }

    const resetScoreBtn = _app.myMenu.getResetScoreBtn();
    if (resetScoreBtn) {
        resetScoreBtn.addEventListener('click', _app.resetScoreBtn_clickHandler);
    }

    const arrowBoard = document.querySelector("#arrowBoard");
    if (arrowBoard) {
        arrowBoard.addEventListener('click', _app.arrowBoard_clickHandler);
        _app.arrowBoard = arrowBoard;
    }

    window.addEventListener('keyup', _app.window_keyupHandler);
}

_app.showArrowBoard = () => {
    if (_app.arrowBoard) {
        _app.arrowBoard.classList.remove("hidden");
    }
}

_app.startGame = () => {
    if (_app.myMenu && _app.mySnake) {
        const gameDifficult = _app.myMenu.getSelectedDifficult();

        _app.myMenu.hideMenu();
        _app.mySnake.setDifficult(gameDifficult);
        _app.mySnake.start();
        _app.showArrowBoard();
    }
}

_app.startGameBtn_clickHandler = () => {
    _app.startGame();
}

_app.startUp = () => {
    _app.setupGamePage();
}

_app.stopGame = () => {
    if (_app.myMenu && _app.mySnake) {
        _app.mySnake.endGame();
        _app.myMenu.showStartMenu();
        _app.hideArrowBoard();
    }
}

_app.stopGameBtn_clickHandler = () => {
    const message = `Attenzione: i progressi di questa partita non verranno salvati!`;

    if (confirm(message)) {
        _app.stopGame();
    }
}

_app.startUp();