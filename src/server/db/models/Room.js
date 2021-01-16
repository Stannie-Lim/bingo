const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, INTEGER, STRING } = Sequelize;

const Room = db.define("room", {
  id: {
    type: STRING,
    primaryKey: true,
  },
});

module.exports = Room;
