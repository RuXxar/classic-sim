import { generateValidGrid, getAdjacentPositions } from "./grid.js"; // Assume your function is exported from this file

describe('generateValidGrid', () => {
    test('should create a grid with exactly 3 rows and 4 columns', () => {
        const grid = generateValidGrid();
        expect(grid.length).toBe(3); // Check rows
        grid.forEach(row => {
            expect(row.length).toBe(4); // Check columns
        });
    });

    test('should have exactly 4 blue, 4 red, and 4 yellow shapes', () => {
        const grid = generateValidGrid();
        const flatGrid = grid.flat();
        expect(flatGrid.filter(cell => cell === 'blue').length).toBe(4);
        expect(flatGrid.filter(cell => cell === 'red').length).toBe(4);
        expect(flatGrid.filter(cell => cell === 'yellow').length).toBe(4);
    });

    test('no more than 2 blues in any row', () => {
        const grid = generateValidGrid();
        grid.forEach(row => {
            expect(row.filter(cell => cell === 'blue').length).toBeLessThanOrEqual(2);
        });
    });

    test('every blue must be adjacent to at least one red and one yellow', () => {
        const grid = generateValidGrid();
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 'blue') {
                    const adjacents = [];
                    if (rowIndex > 0) adjacents.push(grid[rowIndex - 1][colIndex]);
                    if (rowIndex < grid.length - 1) adjacents.push(grid[rowIndex + 1][colIndex]);
                    if (colIndex > 0) adjacents.push(grid[rowIndex][colIndex - 1]);
                    if (colIndex < row.length - 1) adjacents.push(grid[rowIndex][colIndex + 1]);

                    const hasRed = adjacents.includes('red');
                    const hasYellow = adjacents.includes('yellow');
                    expect(hasRed).toBe(true);
                    expect(hasYellow).toBe(true);
                }
            });
        });
    });

    test('all red and yellows must have an adjacent blue', () => {
        const grid = generateValidGrid(); // Generate the grid
        const rows = grid.length;
        const cols = grid[0].length;

        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 'red' || cell === 'yellow') {
                    const adjacents = [];
                    if (colIndex > 0) adjacents.push(grid[rowIndex][colIndex - 1]);
                    if (colIndex < cols - 1) adjacents.push(grid[rowIndex][colIndex + 1]);
                    if (rowIndex > 0) adjacents.push(grid[rowIndex - 1][colIndex]);
                    if (rowIndex < rows - 1) adjacents.push(grid[rowIndex + 1][colIndex]);

                    const hasAdjacentBlue = adjacents.includes('blue');
                    expect(hasAdjacentBlue).toBe(true); // Expect an adjacent blue
                }
            });
        });
    });

    test('should contain exactly 4 unique trios', () => {
        const grid = generateValidGrid();
        const usedPositions = new Set();
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 'blue') {
                    const adjacents = getAdjacentPositions(rowIndex, colIndex, grid.length, row.length, usedPositions);
                    expect(adjacents.filter(pos => grid[pos[0]][pos[1]] === 'red').length).toBe(1);
                    expect(adjacents.filter(pos => grid[pos[0]][pos[1]] === 'yellow').length).toBe(1);
                    // Add current position and its adjacents to the usedPositions
                    usedPositions.add(`${rowIndex},${colIndex}`);
                    adjacents.forEach(pos => usedPositions.add(`${pos[0]},${pos[1]}`));
                }
            });
        });
        expect(usedPositions.size).toBe(12); // 4 trios * 3 positions per trio
    });
});
