const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
];
const findWordInMatrix = (word, matrix) => {
    word = word.toUpperCase().trim();
    const numRows = matrix.length;
    if (numRows === 0) return false;
    const numCols = matrix[0].length;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (matrix[row][col].toUpperCase() === word[0]) {
                for (const dir of directions) {
                    if (checkDirection(word, matrix, row, col, dir)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

const checkDirection = (word, matrix, startRow, startCol, dir) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const [rowDir, colDir] = dir;
    for (let i = 0; i < word.length; i++) {
        const currentRow = startRow + i * rowDir;
        const currentCol = startCol + i * colDir;
        if (
            currentRow < 0 ||
            currentRow >= numRows ||
            currentCol < 0 ||
            currentCol >= numCols
        ) {
            return false;
        }
        if (matrix[currentRow][currentCol].toUpperCase() !== word[i]) {
            return false;
        }
    }
    return true;
};
const solveWordSearch = (words, matrix) => {
    const results = [];
    for (const word of words) {
        const cleanWord = word.trim();
        if (cleanWord.length > 0) {
            const isFound = findWordInMatrix(cleanWord, matrix);
            results.push({ word: cleanWord, found: isFound });
        }
    }
    return results;
};
module.exports = {
    solveWordSearch,
};