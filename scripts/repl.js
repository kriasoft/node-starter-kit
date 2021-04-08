require("reflect-metadata");

const { createConnection } = require("typeorm");
const config = require("../ormconfig");

createConnection(config).then((connection) => {
  global.db = connection;
});
