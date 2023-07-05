class ScoreManager {
    localScoreKey = "highScore";
    localScore = {
        lastScore: [0, 0, 0],
        highScore: [0, 0, 0],
    }

    constructor (levelDisplay) {
        if (!levelDisplay) {
            console.error("levelDisplay non trovato");
        }

        this.levelDisplay = levelDisplay;
    }

    clearScore () {
        this.localScore.lastScore = [0, 0, 0];
        this.localScore.highScore = [0, 0, 0];

        localStorage.removeItem(this.localScoreKey);
    }

    getLastScore (difficult = 0) {
        return this.localScore.lastScore[difficult];
    }

    getHighScore (difficult = 0) {
        return this.localScore.highScore[difficult];
    }

    readLocalScore () {
        const savedScoreData = localStorage.getItem(this.localScoreKey)
        let savedScore = null;

        try {
            savedScore = JSON.parse(savedScoreData);
        } catch {
            console.error(error);
        }

        if (savedScore != null) {
            if (savedScore.lastScore != null && savedScore.highScore != null) {
                this.localScore = savedScore;
                console.log(savedScore);
            }
        }
    }

    setLastScore (score = 0, difficult = 0) {
        this.localScore.lastScore[difficult] = score;

        if (score > this.localScore.highScore[difficult]) {
            this.localScore.highScore[difficult] = score;
        }

        this.saveLocalScore();
    }

    saveLocalScore () {
        localStorage.setItem(this.localScoreKey, JSON.stringify(this.localScore));
    }

    updateLevelDisplay (level = 0) {
        if (!this.levelDisplay) {
            return;
        }

        if (level > 0) {
            this.levelDisplay.innerHTML = `<h1>Level ${level}</h1>`;
        } else {
            this.levelDisplay.innerHTML = "";
        }
    }
}

export default ScoreManager;