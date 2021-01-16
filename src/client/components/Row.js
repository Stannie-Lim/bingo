import React from "react";

// materialui
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const Row = ({ numbers, rowIndex, click }) => {
  return (
    <div className="row">
      {numbers.map((cell, colIndex) => {
        return (
          <div
            className="cell"
            key={colIndex}
            onClick={() => click(rowIndex, colIndex)}
          >
            <span className="board-number">{cell.number}</span>
            {cell.isMarked ? (
              <span className="marked">
                <RadioButtonUncheckedIcon fontSize="inherit" />
              </span>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
