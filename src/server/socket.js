const RandomizedSet = require("./classes/RandomizedSet");

let numbers = new RandomizedSet();
let chosenNumbers = [];
let listOfPlayers = [];

const sendNumbers = (io) => {
  io.emit("number", chosenNumbers);
};

let interval;
const listenForNumbers = (io) => {
  interval = setInterval(() => {
    if (chosenNumbers.length === 100) return;

    const randomNumber = numbers.getRandom();
    chosenNumbers.unshift(randomNumber);

    sendNumbers(io);

    numbers.remove(randomNumber);
  }, 2500);
};

const makeNewBoard = () => {
  const numbersToPutInBoard = new RandomizedSet();
  const newBoard = [];

  for (let i = 0; i < 5; i++) {
    const arr = [];
    for (let j = 0; j < 5; j++) {
      if (i === ~~(5 / 2) && j === ~~(5 / 2)) {
        const node = {
          number: "",
          isMarked: true,
        };
        arr.push(node);
        continue;
      }

      const randomNumber = numbersToPutInBoard.getRandom();
      const node = {
        number: randomNumber,
        isMarked: false,
      };
      arr.push(node);
      numbersToPutInBoard.remove(randomNumber);
    }
    newBoard.push(arr);
  }

  return newBoard;
};

module.exports = (io) => {
  listenForNumbers(io);

  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on("new-player", (user) => {
      listOfPlayers.push({
        socket: socket.id,
        user,
      });
      io.emit("list-of-players", listOfPlayers);
    });

    const newBoard = makeNewBoard();
    socket.emit("board", newBoard);

    socket.on("won", ({ winner }) => {
      io.emit("winner", winner);
      clearInterval(interval);

      let count = 1000;
      for (let i = 10; i > 0; i--) {
        setTimeout(() => {
          io.emit("countdown", `Next game will start in ${i}.`);
        }, count);
        count += 1000;
      }

      setTimeout(() => {
        io.emit("winner", "");
        numbers = new RandomizedSet();
        chosenNumbers = [];
        listenForNumbers(io);

        const allPlayers = io.sockets.clients().sockets;
        for (const player of Object.values(allPlayers)) {
          const newBoard = makeNewBoard();
          player.emit("board", newBoard);
        }
      }, 11000);

      setTimeout(() => {
        io.emit("countdown", "");
      }, 11000);
    });

    socket.on("getnumbers", () => {
      sendNumbers(io);
    });

    socket.on("disconnect", () => {
      listOfPlayers = listOfPlayers.filter(
        (player) => player.socket !== socket.id
      );
      io.emit("list-of-players", listOfPlayers);
    });
  });
};
