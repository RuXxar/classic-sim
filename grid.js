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
        ['blue', null, null],
        [null, null, 'blue'],
        ['blue', null, null],
        [null, null, 'blue']
    ];

    /* Visual aid:
     ['blue', null, 'blue', null]
     [null,   null,  null,  null]
     [null,  'blue', null, 'blue']
    */

    let color01 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color22 = getRandomInt(0, 1);

    grid[1][0] = intToColor(color01);
    grid[0][1] = intToColor(color01 ^ 1);
    grid[0][2] = intToColor(color20);
    grid[1][1] = intToColor(color20 ^ 1);
    grid[3][0] = intToColor(color03);
    grid[2][1] = intToColor(color03 ^ 1);
    grid[2][2] = intToColor(color22);
    grid[3][1] = intToColor(color22 ^ 1);

    return {
        "grid": grid,
        "solution": [
            [[[0, 0], [1, 0]], [[0, 0], [0, 1]]],
            [[[1, 2], [1, 1]], [[1, 2], [0, 2]]],
            [[[2, 0], [3, 0]], [[2, 0], [2, 1]]],
            [[[3, 2], [3, 1]], [[3, 2], [2, 2]]]
        ]
    };
}

function getPattern2() {
    let grid = [
        ['blue', null, null],
        [null, null, 'blue'],
        [null, null, 'blue'],
        ['blue', null, null]
    ];

    /* Visual Aid:
        ['blue', null,   null, 'blue']
        [null,   null,   null,  null]
        [null,  'blue', 'blue', null]
    */

    let color01 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color02 = getRandomInt(0, 1);
    let color23 = getRandomInt(0, 1);

    grid[1][0] = intToColor(color01);
    grid[0][1] = intToColor(color01 ^ 1);
    grid[0][2] = intToColor(color20);
    grid[1][1] = intToColor(color20 ^ 1);
    grid[2][0] = intToColor(color02);
    grid[3][1] = intToColor(color02 ^ 1);
    grid[3][2] = intToColor(color23);
    grid[2][1] = intToColor(color23 ^ 1);

    return {
        "grid": grid,
        "solution": [
            [[[0, 0], [1, 0]], [[0, 0], [0, 1]]],
            [[[1, 2], [1, 1]], [[1, 2], [0, 2]]],
            [[[2, 2], [2, 1]], [[2, 2], [3, 2]]],
            [[[3, 0], [2, 0]], [[3, 0], [3, 1]]]
        ]
    };
}

function getPattern3() {
    let grid = [
        [null, 'blue', null],
        ['blue', null, null],
        [null, null, 'blue'],
        [null, 'blue', null]
    ];
    /* Visual Aid: 
        [null,  'blue', null,  null]
        ['blue', null,  null, 'blue']
        [null,   null, 'blue', null]
    */

    let color20 = getRandomInt(0, 1);
    let color00 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color23 = getRandomInt(0, 1);

    grid[0][2] = intToColor(color20);
    grid[2][0] = intToColor(color20 ^ 1);
    grid[0][0] = intToColor(color00);
    grid[1][1] = intToColor(color00 ^ 1);
    grid[3][0] = intToColor(color03);
    grid[1][2] = intToColor(color03 ^ 1);
    grid[3][2] = intToColor(color23);
    grid[2][1] = intToColor(color23 ^ 1);

    let color20pair = color00 ^ color20 == 1 ? [0, 0] : [1, 1];
    let color02pair = color00 ^ color20 == 1 ? [1, 1] : [0, 0];
    let color03pair = color03 ^ color23 == 1 ? [3, 2] : [2, 1];
    let color21pair = color03 ^ color23 == 1 ? [2, 1] : [3, 2];

    return {
        "grid": grid,
        "solution": [
            [[[0, 1], [0, 2]], [[0, 1], color20pair]],
            [[[1, 0], [2, 0]], [[1, 0], color02pair]],
            [[[2, 2], [1, 2]], [[2, 2], color21pair]],
            [[[3, 1], [3, 0]], [[3, 1], color03pair]],
        ]
    };
}

function getPattern4() {
    let grid = [
        ['blue', null, null],
        [null, null, 'blue'],
        [null, 'blue', null],
        [null, 'blue', null]
    ];
    /* Visual Aid:
        ['blue', null,  null,   null],
        [null,   null, 'blue', 'blue'],
        [null,  'blue', null,   null] 
    */

    let color01 = getRandomInt(0, 1);
    let color03 = getRandomInt(0, 1);
    let color20 = getRandomInt(0, 1);
    let color22 = getRandomInt(0, 1);

    grid[1][0] = intToColor(color01);
    grid[0][1] = intToColor(color01 ^ 1);
    grid[3][0] = intToColor(color03);
    grid[3][2] = intToColor(color03 ^ 1);
    grid[0][2] = intToColor(color20);
    grid[2][0] = intToColor(color20 ^ 1);
    grid[2][2] = intToColor(color22);
    grid[1][1] = intToColor(color22 ^ 1);

    let color20pair = color20 ^ color22 == 1 ? [2, 2] : [1, 1];
    let color02pair = color20 ^ color22 == 1 ? [1, 1] : [2, 2];

    return {
        "grid": grid,
        "solution": [
            [[[0, 0], [1, 0]], [[0, 0], [0, 1]]],
            [[[1, 2], [0, 2]], [[1, 2], color20pair]],
            [[[2, 1], [2, 0]], [[2, 1], color02pair]],
            [[[3, 1], [3, 0]], [[3, 1], [3, 2]]]
        ]
    };
}

function getRandomPattern() {
    return [getPattern1, getPattern2, getPattern3, getPattern3, getPattern3, getPattern3, getPattern4, getPattern4][getRandomInt(0, 7)]();
}

function flipVert(someMap) {
    const rows = 3;
    const cols = 4;
    let coordsMap = Array.from({ length: cols }, () => new Array(rows).fill(null));
    let newGrid = Array.from({ length: cols }, () => new Array(rows).fill(null));
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            newGrid[col][row] = someMap.grid[col][rows - row - 1];
            coordsMap[col][row] = [col, rows - row - 1];
        }
    }

    for (let i = 0; i < someMap.solution.length; ++i) {
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; ++j) {
                someMap.solution[i][k][j] = coordsMap[someMap.solution[i][k][j][0]][someMap.solution[i][k][j][1]];
            }
        }
    }

    return { "grid": newGrid, "solution": someMap.solution };
}

function flipHoriz(someMap) {
    const rows = 3;
    const cols = 4;
    let coordsMap = Array.from({ length: cols }, () => new Array(rows).fill(null));
    let newGrid = Array.from({ length: cols }, () => new Array(rows).fill(null));
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            newGrid[col][row] = someMap.grid[cols - col - 1][row];
            coordsMap[col][row] = [cols - col - 1, row];
        }
    }

    for (let i = 0; i < someMap.solution.length; ++i) {
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; ++j) {
                someMap.solution[i][k][j] = coordsMap[someMap.solution[i][k][j][0]][someMap.solution[i][k][j][1]];
            }
        }
    }

    return { "grid": newGrid, "solution": someMap.solution };
}

export function generateGridAndSolution() {
    let gridAndSolution = getRandomPattern();
    //if (getRandomInt(0, 1) == 1) {
    //gridAndSolution = flipHoriz(gridAndSolution);
    //}
    if (getRandomInt(0, 1) == 1) {
        gridAndSolution = flipVert(gridAndSolution);
    }

    return gridAndSolution;
}