import React from "react";

// components
import Row from "./Row";

// css
import "./Board.css";

const Board = ({ board, click }) => {
  return (
    <div className="board">
      {board.map((numbers, index) => (
        <Row key={index} numbers={numbers} rowIndex={index} click={click} />
      ))}
    </div>
  );
};

export default Board;
