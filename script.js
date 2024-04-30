import { generateValidGrid } from "./grid.js";

function displayGrid(grid) {
    if (!grid) {
        gameBoard.innerHTML = "<p>No valid configuration found within the attempt limit.</p>";
        return;
    }

    gameBoard.innerHTML = '';  // Clear previous content
    grid.forEach(row => {
        let rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.forEach(cell => {
            let cellDiv = document.createElement('div');
            cellDiv.className = `shape ${cell}`;
            rowDiv.appendChild(cellDiv);
        });
        gameBoard.appendChild(rowDiv);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('gameBoard');
    const validGrid = generateValidGrid();
    displayGrid(validGrid);

    document.querySelector('.rotate-button').addEventListener("click", (event) => {
        gameBoard.classList.toggle('rotated180');
    });

    document.querySelector('.new-pattern').addEventListener("click", (event) => {
        const validGrid = generateValidGrid();
        displayGrid(validGrid);
    });
});
