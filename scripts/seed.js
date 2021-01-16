const { db /* models here */ } = require("../src/server/db/models");

const seed = async () => {
  await db.sync({ force: true });
  console.log("seeding");

  try {
    console.log("idk seed something here");
  } catch (err) {
    console.log(err);
  }

  console.log("closing db connection");
  await db.close();
  console.log("db closed");
};

if (module === require.main) {
  seed();
}
