class SoundManager {
    constructor () {
        this.eatFood = document.createElement('audio');
        this.buttonClick = document.createElement('audio');
        this.gameOver = document.createElement('audio');
    }

    loadSounds () {
        const eatFoodSrc = "./assets/eatfood.mp3";
        const buttonClickSrc = "./assets/buttonclick.mp3";
        const gameOverSrc = "./assets/gameover.mp3";

        this.eatFood.setAttribute('src', eatFoodSrc);
        this.eatFood.load();

        this.buttonClick.setAttribute('src', buttonClickSrc);
        this.buttonClick.load();

        this.gameOver.setAttribute('src', gameOverSrc);
        this.gameOver.load();
    }

    playButtonClick () {
        this.eatFood.currentTime = 0;
        this.buttonClick.play();
    }

    playEatFood () {
        this.eatFood.currentTime = 0;
        this.eatFood.play();
    }

    playGameOver () {
        this.gameOver.currentTime = 0;
        this.gameOver.play();
    }
}

export default SoundManager;