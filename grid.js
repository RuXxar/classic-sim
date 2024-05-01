function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intToColor(num) {
    return num == 1 ? 'red' : 'yellow';
}

function getPattern1() {
    let grid = [
        ['blue', null, 'blue', null],
        [null, null, null, null],
        [null, 'blue', null, 'blue']
    ];

    let color01 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color22 = getRandomInt(0, 1);

    grid[0][1] = intToColor(color01);
    grid[1][0] = intToColor(color01 ^ 1);
    grid[2][0] = intToColor(color20);
    grid[1][1] = intToColor(color20 ^ 1);
    grid[0][3] = intToColor(color03);
    grid[1][2] = intToColor(color03 ^ 1);
    grid[2][2] = intToColor(color22);
    grid[1][3] = intToColor(color22 ^ 1);

    return {
        "grid": grid,
        "solution": [
            [[0, 0], [0, 1]], [[0, 0], [1, 0]],
            [[2, 1], [1, 1]], [[2, 1], [2, 0]],
            [[0, 2], [0, 3]], [[0, 2], [1, 2]],
            [[2, 3], [1, 3]], [[2, 3], [2, 2]]
        ]
    };
}

function getPattern2() {
    let grid = [
        ['blue', null, null, 'blue'],
        [null, null, null, null],
        [null, 'blue', 'blue', null]
    ];

    let color01 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color02 = getRandomInt(0, 1);
    let color23 = getRandomInt(0, 1);

    grid[0][1] = intToColor(color01);
    grid[1][0] = intToColor(color01 ^ 1);
    grid[2][0] = intToColor(color20);
    grid[1][1] = intToColor(color20 ^ 1);
    grid[0][2] = intToColor(color02);
    grid[1][3] = intToColor(color02 ^ 1);
    grid[2][3] = intToColor(color23);
    grid[1][2] = intToColor(color23 ^ 1);

    return {
        "grid": grid,
        "solution": [
            [[0, 0], [0, 1]], [[0, 0], [1, 0]],
            [[2, 1], [1, 1]], [[2, 1], [2, 0]],
            [[0, 3], [0, 2]], [[0, 3], [1, 3]],
            [[2, 2], [1, 2]], [[2, 2], [2, 3]]
        ]
    };
}

function getPattern3() {
    let grid = [
        [null, 'blue', null, null],
        ['blue', null, null, 'blue'],
        [null, null, 'blue', null]
    ];

    let color20 = getRandomInt(0, 1);
    let color00 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color23 = getRandomInt(0, 1);

    grid[2][0] = intToColor(color20);
    grid[0][2] = intToColor(color20 ^ 1);
    grid[0][0] = intToColor(color00);
    grid[1][1] = intToColor(color00 ^ 1);
    grid[0][3] = intToColor(color03);
    grid[2][1] = intToColor(color03 ^ 1);
    grid[2][3] = intToColor(color23);
    grid[1][2] = intToColor(color23 ^ 1);

    let color20pair = color00 ^ color20 == 1 ? [0, 0] : [1, 1];
    let color02pair = color00 ^ color20 == 1 ? [1, 1] : [0, 0];
    let color03pair = color03 ^ color23 == 1 ? [2, 3] : [1, 2];
    let color21pair = color03 ^ color23 == 1 ? [1, 2] : [2, 3];

    return {
        "grid": grid,
        "solution": [
            [[0, 1], [0, 2]], [[0, 1], color02pair],
            [[1, 0], [2, 0]], [[1, 0], color20pair],
            [[1, 3], [0, 3]], [[1, 3], color03pair],
            [[2, 2], [2, 1]], [[2, 2], color21pair]
        ]
    };
}

function getPattern4() {
    let grid = [
        ['blue', null, null, null],
        [null, null, 'blue', 'blue'],
        [null, 'blue', null, null]
    ];

    let color01 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color22 = getRandomInt(0, 1);

    grid[0][1] = intToColor(color01);
    grid[1][0] = intToColor(color01 ^ 1);
    grid[0][3] = intToColor(color03);
    grid[2][3] = intToColor(color03 ^ 1);
    grid[2][0] = intToColor(color20);
    grid[0][2] = intToColor(color20 ^ 1);
    grid[2][2] = intToColor(color22);
    grid[1][1] = intToColor(color22 ^ 1);

    let color20pair = color20 ^ color22 == 1 ? [2, 2] : [1, 1];
    let color02pair = color20 ^ color22 == 1 ? [1, 1] : [2, 2];

    return {
        "grid": grid,
        "solution": [
            [[0, 0], [0, 1]], [[0, 0], [1, 0]],
            [[2, 1], [2, 0]], [[2, 1], color20pair],
            [[1, 2], [0, 2]], [[1, 2], color02pair],
            [[1, 3], [0, 3]], [[1, 3], [2, 3]]
        ]
    };
}

function getRandomPattern() {
    return [getPattern1, getPattern2, getPattern3, getPattern3, getPattern3, getPattern3, getPattern4, getPattern4][getRandomInt(0, 7)]();
}

function flipVert(someMap) {
    const rows = 3;
    const cols = 4;
    let coordsMap = Array.from({ length: rows }, () => new Array(cols).fill(null));
    let newGrid = Array.from({ length: rows }, () => new Array(cols).fill(null));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            newGrid[row][col] = someMap.grid[row][cols - col - 1];
            coordsMap[row][col] = [row, cols - col - 1];
        }
    }

    for (let i = 0; i < someMap.solution.length; ++i) {
        for (let j = 0; j < 2; ++j) {
            someMap.solution[i][j] = coordsMap[someMap.solution[i][j][0]][someMap.solution[i][j][1]];
        }
    }

    return { "grid": newGrid, "solution": someMap.solution };
}

function flipHoriz(someMap) {
    const rows = 3;
    const cols = 4;
    let coordsMap = Array.from({ length: rows }, () => new Array(cols).fill(null));
    let newGrid = Array.from({ length: rows }, () => new Array(cols).fill(null));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            newGrid[row][col] = someMap.grid[rows - row - 1][col];
            coordsMap[row][col] = [rows - row - 1, col];
        }
    }

    for (let i = 0; i < someMap.solution.length; ++i) {
        for (let j = 0; j < 2; ++j) {
            someMap.solution[i][j] = coordsMap[someMap.solution[i][j][0]][someMap.solution[i][j][1]];
        }
    }

    return { "grid": newGrid, "solution": someMap.solution };
}

export function generateValidGrid() {
    let sol = getRandomPattern();
    if (getRandomInt(0, 1) == 1) {
        sol = flipHoriz(sol);
    }
    if (getRandomInt(0, 1) == 1) {
        sol = flipVert(sol);
    }

    console.log(sol.solution);
    return sol.grid;
}