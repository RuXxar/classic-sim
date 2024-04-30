export function getAdjacentPositions(row, col, rows, cols, usedPositions) {
    const positions = [];
    if (row > 0 && !usedPositions.has(`${row - 1},${col}`)) positions.push([row - 1, col]);
    if (row < rows - 1 && !usedPositions.has(`${row + 1},${col}`)) positions.push([row + 1, col]);
    if (col > 0 && !usedPositions.has(`${row},${col - 1}`)) positions.push([row, col - 1]);
    if (col < cols - 1 && !usedPositions.has(`${row},${col + 1}`)) positions.push([row, col + 1]);
    return positions;
}

function placeTrio(grid, row, col, rows, cols, usedPositions) {
    let adjacents = getAdjacentPositions(row, col, rows, cols, usedPositions);
    if (adjacents.length >= 2) {
        shuffleArray(adjacents); // Randomizes the array of adjacent positions
        const redPos = adjacents.pop();   // Selects one position for red
        const yellowPos = adjacents.pop(); // Selects another position for yellow

        // Place red and yellow in the selected positions
        grid[row][col] = 'blue';
        grid[redPos[0]][redPos[1]] = 'red';
        grid[yellowPos[0]][yellowPos[1]] = 'yellow';

        // Mark these positions as used
        usedPositions.add(`${row},${col}`);
        usedPositions.add(`${redPos[0]},${redPos[1]}`);
        usedPositions.add(`${yellowPos[0]},${yellowPos[1]}`);

        return true;
    }
    return false;
}



export function generateValidGrid() {
    const rows = 3;
    const cols = 4;
    let grid = Array.from({ length: rows }, () => new Array(cols).fill(null));
    let attempts = 0;
    const maxAttempts = 10000;

    while (attempts < maxAttempts) {
        // Reset grid and used positions on each attempt
        grid.forEach(row => row.fill(null));
        let usedPositions = new Set();  // To track positions of all trio members
        let positions = [];

        // Generate all grid positions
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                positions.push([row, col]);
            }
        }

        // Shuffle positions to randomize starting points
        shuffleArray(positions);


        // Try to create 4 unique trios from random positions
        for (let i = 0; i < positions.length && usedPositions.size < 12; i++) {
            const [row, col] = positions[i];
            if (!grid[row][col]) {
                if (placeTrio(grid, row, col, rows, cols, usedPositions)) {
                    usedPositions.add(`${row},${col}`);
                }
            }
        }

        if (usedPositions.size === 12 && isValidSetup(grid, usedPositions)) {
            return grid;
        }
        attempts++;

        /*        // Attempt to create 4 unique trios
               let triosCreated = 0;
               for (let row = 0; row < rows; row++) {
                   for (let col = 0; col < cols; col++) {
                       if (!grid[row][col] && triosCreated < 4) {
                           let adjacents = getAdjacentPositions(row, col, rows, cols, usedPositions);
                           if (adjacents.length >= 2) {
                               shuffleArray(adjacents);
                               const redPos = adjacents.pop();
                               const yellowPos = adjacents.pop();
                               grid[row][col] = 'blue';
                               grid[redPos[0]][redPos[1]] = 'red';
                               grid[yellowPos[0]][yellowPos[1]] = 'yellow';
                               // Mark these positions as used
                               usedPositions.add(`${row},${col}`);
                               usedPositions.add(`${redPos[0]},${redPos[1]}`);
                               usedPositions.add(`${yellowPos[0]},${yellowPos[1]}`);
                               triosCreated++;
                           }
                       }
                   }
               }
       
               if (triosCreated === 4 && isValidSetup(grid)) {
                   return grid;
               } */

        //attempts++;
    }

    throw new Error("Failed to generate a valid grid within the attempt limit.");
}

function isValidSetup(grid) {
    const rows = grid.length;
    const cols = grid[0][0].length;
    let adjacencyMap = new Map();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 'blue') {
                let adjacents = getAdjacentPositions(row, col, rows, cols, new Set());
                let redFound = false;
                let yellowFound = false;

                adjacents.forEach(([adjRow, adjCol]) => {
                    const color = grid[adjRow][adjCol];
                    if (color === 'red' && !redFound) {
                        if (adjacencyMap.has(`${adjRow},${adjCol}`)) return false;
                        adjacencyMap.set(`${adjRow},${adjCol}`, 'red');
                        redFound = true;
                    } else if (color === 'yellow' && !yellowFound) {
                        if (adjacencyMap.has(`${adjRow},${adjCol}`)) return false;
                        adjacencyMap.set(`${adjRow},${adjCol}`, 'yellow');
                        yellowFound = true;
                    }
                });

                if (!redFound || !yellowFound) return false;
            }
        }
    }

    return true;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}