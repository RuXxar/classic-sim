import { generateGridAndSolution } from "./grid.js";
import { generateSolvingState, displayGrid, displaySolution } from "./visual.js";

document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('gameBoard');
    let gridAndSolution = generateGridAndSolution();
    let solvingState = generateSolvingState();
    displayGrid(gridAndSolution.grid, gameBoard);
    let timer = solvingState.timer;

    document.querySelector('.rotate-button').addEventListener("click", (event) => {
        if (!gameBoard.classList.contains('rotated180')) {
            gameBoard.classList.add('rotated180');
        } else {
            gameBoard.classList.remove('rotated180');
        }
    });

    document.querySelector('.new-pattern').addEventListener("click", (event) => {
        if (timer) {
            clearInterval(timer)
        }
        gridAndSolution = generateGridAndSolution();
        solvingState = generateSolvingState();
        displayGrid(gridAndSolution.grid, gameBoard);
        timer = solvingState.timer;
        gameBoard.classList.remove('rotated180');
    });

    document.querySelector('.solve').addEventListener("click", (event) => {
        displaySolution(gridAndSolution.solution, gameBoard, solvingState);
        gameBoard.classList.add('rotated180');

        if (timer) {
            clearInterval(timer);
        }
    });
});
