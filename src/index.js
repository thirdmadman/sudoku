module.exports = function solveSudoku(matrix) {
  let board = matrix;
  const printBoard = (board) => {
    for (let x = 0; x < board.length; x++) {
      let line = "| ";
      for (let y = 0; y < board[0].length; y++) {
        line += board[x][y] + " | ";
      }
      console.log(line);
    }
    console.log("\n");
  };
  printBoard(matrix);

  const findEmpty = (board) => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (board[r][c] === 0) {
          return [r,c];
        }
      }
    }
    return null;
  };

  const validate = (num, pos, board) => {
    const [r, c] = pos;

    for (let i = 0; i < board.length; i++) {
      if (board[i][c] === num && i !== r) {
        return false;
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[r][i] === num && i !== c) {
        return false;
      }
    }

    const boxRow = Math.floor(r / 3) * 3;
    const boxCol = Math.floor(c / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  };

  const slove = () => {
    const currPos = findEmpty(board);
    if (currPos === null) {
      return true;
    }

    for (let i = 1; i < board.length + 1; i++) {
      const currNum = i;
      const isValid = validate(currNum, currPos, board);

      if (isValid) {
        const [x, y] = currPos;
        board[x][y] = currNum;

        if (slove()) {
          return true;
        }
        board[x][y] = 0;
      }
    };
    return false;
  };

  slove();
  printBoard(board);
  return board;
}