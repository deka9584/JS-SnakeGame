class InputManager {
    inputEnabled = false;
    inputDirection = {x: 0, y: 0};
    lastInputDirection = {x: 0, y: 0};

    constructor () {
        window.addEventListener('keydown', this.keydownHandler.bind(this));
    }

    keydownHandler (event) {
        this.processKey(event.key);
    }

    processKey (key = "") {
        if (!this.inputEnabled) {
            return;
        }

        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.lastInputDirection.y !== 0) break;
                this.inputDirection = {x: 0, y: -1};
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.lastInputDirection.y !== 0) break;
                this.inputDirection = {x: 0, y: 1};
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.lastInputDirection.x !== 0) break;
                this.inputDirection = {x: -1, y: 0};
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.lastInputDirection.x !== 0) break;
                this.inputDirection = {x: 1, y: 0};
                break;
        }
    }

    getInputDirection () {
        this.lastInputDirection = this.inputDirection;
        return this.inputDirection;
    }

    setInputEnabled (enabled = true) {
        this.inputEnabled = enabled;
    }

    resetInputDirection () {
        const defDirection = {x: 0, y: 0};

        this.inputDirection = defDirection;
        this.lastInputDirection = defDirection;
    }
}

export default InputManager;