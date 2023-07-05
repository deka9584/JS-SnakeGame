class Menu {
    diffButtons = [];
    selectedDifficult = 0;
    startText = "Start!";
    resumeText = "Riprendi!";
    startGameBtn = null;
    stopGameBtn = null;
    resetScoreBtn = null;

    constructor(menuContainer) {
        if (!menuContainer) {
            throw new Error("Impossibile continuare. Menu non trovato");
        }

        this.menuContainer = menuContainer;
    }

    diffBtn_clickHandler (event) {
        const difficultData = event.currentTarget.dataset.difficult

        this.selectedDifficult = parseInt(difficultData);
        this.updateDiffButtons();
    }

    generateMenu () {
        const logoUrl = "./assets/sneick.png";
        const sectionCssClass = "menu-section";
        const buttonCssClass = "button";

        this.diffButtons.length = 0;
        this.menuContainer.innerHTML = "";

        const section1 = document.createElement('section');
        section1.classList.add(sectionCssClass);
        section1.innerHTML = `<img src="${logoUrl}" alt="Sneick">`

        const section2 = document.createElement('section');
        section2.classList.add(sectionCssClass);
        
        const startGameBtn = document.createElement('button');
        startGameBtn.innerText = this.startText;
        startGameBtn.classList.add(buttonCssClass);
        startGameBtn.classList.add("main-button");
        this.startGameBtn = startGameBtn;

        section2.appendChild(startGameBtn);

        const section3 = document.createElement('section');
        section3.classList.add(sectionCssClass);

        const diffEasyBtn = document.createElement('button');
        diffEasyBtn.innerText = "Facile";
        diffEasyBtn.classList.add(buttonCssClass);
        diffEasyBtn.classList.add("yellow-button");
        diffEasyBtn.dataset.difficult = 0;

        this.diffButtons.push(diffEasyBtn);
        section3.appendChild(diffEasyBtn);

        const diffNormalBtn = document.createElement('button');
        diffNormalBtn.innerText = "Normale";
        diffNormalBtn.classList.add(buttonCssClass);
        diffNormalBtn.classList.add("yellow-button");
        diffNormalBtn.dataset.difficult = 1;

        this.diffButtons.push(diffNormalBtn);
        section3.appendChild(diffNormalBtn);

        const diffHardBtn = document.createElement('button');
        diffHardBtn.innerText = "Difficile";
        diffHardBtn.classList.add(buttonCssClass);
        diffHardBtn.classList.add("yellow-button");
        diffHardBtn.dataset.difficult = 2;

        this.diffButtons.push(diffHardBtn);
        section3.appendChild(diffHardBtn);

        const logoutBtn = document.createElement('button');
        logoutBtn.innerText = "Stop";
        logoutBtn.classList.add(buttonCssClass);
        logoutBtn.classList.add("red-button");
        logoutBtn.classList.add("hidden");
        this.stopGameBtn = logoutBtn;

        section3.appendChild(logoutBtn);

        const resetScoreBtn = document.createElement('button');
        resetScoreBtn.innerText = "Reset score";
        resetScoreBtn.classList.add(buttonCssClass);
        resetScoreBtn.classList.add("red-button");
        resetScoreBtn.classList.add("hidden");
        this.resetScoreBtn = resetScoreBtn;

        section3.appendChild(resetScoreBtn);

        this.menuContainer.appendChild(section1);
        this.menuContainer.appendChild(section2);
        this.menuContainer.appendChild(section3);

        this.registerDiffBtnEvents();
        this.updateDiffButtons();
    }

    getResetScoreBtn () {
        return this.resetScoreBtn;
    }

    getSelectedDifficult () {
        return this.selectedDifficult;
    }

    getStartGameBtn () {
        return this.startGameBtn;
    }

    getStopGameBtn () {
        return this.stopGameBtn;
    }

    hideMenu () {
        this.menuContainer.classList.add("hidden");
    }

    registerDiffBtnEvents () {
        this.diffButtons.forEach(item => {
            item.addEventListener('click', this.diffBtn_clickHandler.bind(this));
        }, this);
    }

    setSelectedDifficult (difficult) {
        this.selectedDifficult = difficult;

        this.updateDiffButtons();
    }

    showPauseMenu () {
        this.diffButtons.forEach(item => {
            item.classList.add("hidden");
        });

        this.startGameBtn.innerText = this.resumeText;
        this.stopGameBtn.classList.remove("hidden");
        this.resetScoreBtn.classList.remove("hidden");

        this.menuContainer.classList.add("opacity-bg");
        this.menuContainer.classList.remove("hidden");
    }

    showStartMenu () {
        this.diffButtons.forEach(item => {
            item.classList.remove("hidden");
        });

        this.startGameBtn.innerText = this.startText;
        this.stopGameBtn.classList.add("hidden");
        this.resetScoreBtn.classList.add("hidden");

        this.menuContainer.classList.remove("opacity-bg");
        this.menuContainer.classList.remove("hidden");
    }

    updateDiffButtons () {
        this.diffButtons.forEach(item => {
            if (item.dataset.difficult == this.selectedDifficult) {
                item.classList.add("selected-button");
            } else {
                item.classList.remove("selected-button");
            }
        })
    }
}

export default Menu;