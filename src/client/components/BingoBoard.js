import React, { useEffect, useState } from "react";

// components
import Board from "./Board";
import Coordinates from "./Numbers";

// socket
import { won, getNewPlayer } from "../socket";
import { Typography } from "@material-ui/core";

const BingoBoard = ({
  countdownSentence,
  winner,
  setWinner,
  username,
  board,
  setBoard,
  givenNumbers,
}) => {
  const [listOfAllPlayers, setListOfAllPlayers] = useState([]);

  useEffect(() => {
    getNewPlayer(setListOfAllPlayers, username);
  }, []);

  const checkVertical = (_board, row, col) => {
    for (let i = 0; i < _board.length; i++) {
      if (!_board[i][col].isMarked) return false;
    }

    return true;
  };

  const checkHorizontal = (_board, row, col) => {
    for (let i = 0; i < _board.length; i++) {
      if (!_board[row][i].isMarked) return false;
    }

    return true;
  };

  const checkDownDiagonal = (_board) => {
    for (let i = 0; i < _board.length; i++) {
      if (!_board[i][i].isMarked) return false;
    }

    return true;
  };

  const checkUpDiagonal = (_board) => {
    for (let i = 0; i < _board.length; i++) {
      if (!_board[i][_board.length - 1 - i].isMarked) return false;
    }

    return true;
  };

  const checkWinner = (_board, row, col) => {
    const verticalWinner = checkVertical(_board, row, col);
    const horizontalWinner = checkHorizontal(_board, row, col);
    const downDiagonalWinner = checkDownDiagonal(_board);
    const upDiagonalWinner = checkUpDiagonal(_board);

    return (
      verticalWinner ||
      horizontalWinner ||
      downDiagonalWinner ||
      upDiagonalWinner
    );
  };

  const click = (row, col) => {
    if (winner) {
      return;
    }

    const _board = [...board];

    if (givenNumbers.includes(_board[row][col].number)) {
      _board[row][col].isMarked = true;
      const winner = checkWinner(_board, row, col);
      if (winner) {
        setWinner(username);
        won(username);
      }
      setBoard(_board);
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h3" className="typography">
          {countdownSentence}
        </Typography>
      </div>
      <div>
        <Coordinates givenNumbers={givenNumbers} />
      </div>
      <main>
        <div>
          <ul className="list-of-users">
            {listOfAllPlayers.map((player) => (
              <li key={player.socket}>{player.user}</li>
            ))}
          </ul>
        </div>
        <Board board={board} click={click} />
      </main>
      <div>
        <Typography variant="h5" className="typography">
          {winner.length !== 0 ? `${winner} got bingo!` : ""}
        </Typography>
      </div>
    </div>
  );
};

export default BingoBoard;
