import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

const getNewPlayer = (setListOfAllPlayers, username) => {
  socket.emit("new-player", username);
  socket.on("list-of-players", (allPlayers) => {
    setListOfAllPlayers(allPlayers);
  });
};

const countdown = (setCountdown) => {
  socket.on("countdown", (sentence) => {
    setCountdown(sentence);
  });
};

const won = (username) => {
  socket.emit("won", { winner: username });
};

const getBoard = (setBoard) => {
  socket.on("board", (newBoard) => {
    setBoard(newBoard);
  });
};

const getAllNumbers = (setNumbers) => {
  socket.emit("getnumbers");
  getNumbers(setNumbers);
};

const getNumbers = (setGivenNumbers) => {
  socket.on("number", (numbers) => {
    setGivenNumbers(numbers);
  });
};

const checkWinner = (setWinner) => {
  socket.on("winner", (winner) => {
    setWinner(winner);
  });
};

export default socket;

export {
  won,
  getNumbers,
  getBoard,
  getAllNumbers,
  checkWinner,
  countdown,
  getNewPlayer,
};
