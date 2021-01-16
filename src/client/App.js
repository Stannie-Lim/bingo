import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";

//components
import Login from "./components/Login";
import BingoBoard from "./components/BingoBoard";

// socket
import { getBoard, getAllNumbers, checkWinner, countdown } from "./socket";

const App = () => {
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [givenNumbers, setGivenNumbers] = useState([]);
  const [countdownSentence, setCountdownSentence] = useState("");

  useEffect(() => {
    getBoard(setBoard);
    checkWinner(setWinner);
    getAllNumbers(setGivenNumbers);
    countdown(setCountdownSentence);
  }, []);

  const login = (ev) => {
    ev.preventDefault();
    setLoggedIn(true);
  };

  return loggedIn ? (
    <BingoBoard
      winner={winner}
      setWinner={setWinner}
      username={username}
      board={board}
      givenNumbers={givenNumbers}
      setBoard={setBoard}
      countdownSentence={countdownSentence}
    />
  ) : (
    <Login login={login} username={username} setUsername={setUsername} />
  );
};

export default App;
