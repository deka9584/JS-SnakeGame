class FoodManager {
    foodList = [];

    constructor(gameArea = {x: 1, y: 1}) {
        this.gameArea = gameArea;
    }

    update (amount = 1) {
        this.foodList.length = 0;

        if (amount === -1) {
            amount = this.getRandomInt(1, 3);
        }

        for (let i = 0; i < amount; i++) {
            let newFoodX = this.getRandomInt(1, this.gameArea.x);
            let newFoodY = this.getRandomInt(1, this.gameArea.y);
            
            this.foodList.push({x: newFoodX, y: newFoodY});
        }
    }

    draw (gameBoard) {
        this.foodList.forEach(segment => {
            const foodElement = document.createElement('div');

            foodElement.style.gridRowStart = segment.y;
            foodElement.style.gridColumnStart = segment.x;
            foodElement.classList.add("food");

            gameBoard.appendChild(foodElement);
        });
    }

    getFoodList () {
        return this.foodList;
    }

    getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default FoodManager;