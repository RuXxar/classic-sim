import { ICON_PLAYSTATION, ICON_NISI } from "./icons.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomMarker(randomInt) {
    const randomMarker = Object.values(ICON_PLAYSTATION)[randomInt];
    return randomMarker;
}

export function getRandomDebuff(randomInt) {
    const randomDebuff = Object.values(ICON_NISI)[randomInt];

    return randomDebuff;
}

export function displayGrid(grid, gameboard) {
    gameBoard.innerHTML = '';  // Clear previous content
    console.log('the grid', grid)
    grid.forEach(column => {
        let columnDiv = document.createElement('div');
        columnDiv.className = 'column';
        column.forEach(cell => {
            let cellDiv = document.createElement('div');
            cellDiv.className = `shape ${cell}`;
            columnDiv.appendChild(cellDiv);
        });
        gameBoard.appendChild(columnDiv);
    });
}

function getCardinalFromCoords(coordinates) {
    switch (true) {
        // The line will be going right
        case (coordinates[1][0] > coordinates[0][0]): {
            return 'rotate-0'
        }
        // The line will go left
        case (coordinates[1][0] < coordinates[0][0]): {
            return 'rotate-180'
        }
        // The line will be going down
        case (coordinates[0][0] === coordinates[1][0] &&
            coordinates[1][1] > coordinates[0][1]): {
                return 'rotate-90'
            }

        // The line will be going down
        case (coordinates[0][0] === coordinates[1][0] &&
            coordinates[1][1] < coordinates[0][1]): {
                return 'rotate-270'
            }
    }
}

function flipNumber(num) {
    switch (num) {
        case 0: return 3;
        case 1: return 2;
        case 2: return 1;
        case 3: return 0;
        default: return num; // or handle invalid input as needed
    }
}

export function displaySolution(gridAndSolution, gameBoard, solvingState, grid) {
    console.log('the gameboard is', gameBoard)
    console.log('the solution is', gridAndSolution);
    console.log('the solving state', solvingState);

    const marker = solvingState.randomMarkerInt;
    const debuff = solvingState.randomDebuffInt;

    for (let i = 0; i < gridAndSolution.solution.length; i++) {
        const line1Class = getCardinalFromCoords(gridAndSolution.solution[i][0]);
        const line2Class = getCardinalFromCoords(gridAndSolution.solution[i][1]);

        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.classList.add(line1Class, 'line');
        line2.classList.add(line2Class, 'line');

        // Add correct line color
        if (i === flipNumber(marker)) {
            const gridCol1 = gridAndSolution.solution[i][0][1][0];
            const gridRow1 = gridAndSolution.solution[i][0][1][1];
            const line1Color = gridAndSolution.grid[gridCol1][gridRow1];

            const gridCol2 = gridAndSolution.solution[i][0][1][0];
            const gridRow2 = gridAndSolution.solution[i][1][1][1];
            const line2Color = gridAndSolution.grid[gridCol2][gridRow2];

            if (debuff === 0) {
                if (line1Color === 'red') {
                    line1.classList.add('correct-line');
                } else {
                    line2.classList.add('correct-line');
                }
            } else if (debuff === 1) {
                if (line1Color === 'yellow') {
                    line1.classList.add('correct-line');
                } else {
                    line2.classList.add('correct-line');
                }
            }
        }

        const bluePosition = gridAndSolution.solution[i][0][0][1];

        gameBoard.children[i].children[bluePosition].appendChild(line1);
        gameBoard.children[i].children[bluePosition].appendChild(line2);
    }
}

export function generateSolvingState() {
    const marker = document.querySelector('.marker');
    const debuff = document.querySelector('.debuff');

    const randomMarkerInt = getRandomInt(4);
    const randomMarker = getRandomMarker(randomMarkerInt);

    const randomDebuffInt = getRandomInt(2);
    const randomDebuff = getRandomDebuff(randomDebuffInt);

    marker.setAttribute("src", randomMarker)
    debuff.setAttribute("src", randomDebuff)

    const timerHtml = document.querySelector('.timer');

    let timeLeft = 11;

    const timer = setInterval(() => {
        timeLeft--;
        timerHtml.textContent = timeLeft;

        // Stop the countdown when it reaches zero
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerHtml.textContent = "Time's up!";
        }
    }, 1000);

    return {
        timer,
        randomMarkerInt,
        randomDebuffInt
    }
}