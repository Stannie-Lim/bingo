import React, { useEffect } from "react";

// css
import "./Numbers.css";

// materialui
import Typography from "@material-ui/core/Typography";

const Numbers = ({ givenNumbers }) => {
  return (
    <ul className="list-of-numbers">
      {givenNumbers.map((number) => (
        <li className="number">
          <Typography key={number} className="number-typography">
            {number}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default Numbers;
