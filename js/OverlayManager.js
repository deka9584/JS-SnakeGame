class OverlayManager {
    overlayVisible = false;
    startTitle = "Usa le freccette per giocare";
    gameOverTitle = "Game Over";

    constructor (overlay) {
        if (!overlay) {
            throw new Error("Impossibile continuare: Overlay non trovato");
        }

        this.overlay = overlay;
    }

    clearOverlay () {
        if (this.overlayVisible) {
            this.overlayVisible = false;
            this.overlay.innerHTML = "";

            this.overlay.classList.add("hidden");
        }
    }

    showOverlay (gameOver = false, level = 0, highScore = 0) {
        let htmlOutput = "";
        this.overlayVisible = true;

        if (gameOver) {
            htmlOutput += `<h1>${this.gameOverTitle}</h1>`;
            htmlOutput += `<h2>Punteggio: ${level - 1}</h2>`
        } else {
            htmlOutput += `<h1>${this.startTitle}</h1>`;
        }

        if (highScore > 0) {
            htmlOutput += `<h2>Record: ${highScore}</h2>`
        }

        this.overlay.innerHTML = htmlOutput;

        this.overlay.classList.remove("hidden");
    }
}

export default OverlayManager;