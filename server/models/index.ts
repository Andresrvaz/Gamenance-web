import { Sequelize } from "sequelize";
const { DB_PASSWORD, DEBUG_DB, DB_MAX_POOL_SIZE } = process.env;

export const gamenanceDB = new Sequelize("Gamenance", "root", DB_PASSWORD, {
  logging: DEBUG_DB === "true" ? console.log : false,
  dialect: "mysql",
  pool: {
    max: Number(DB_MAX_POOL_SIZE || 1),
    min: 0,
    idle: 60000,
  },
});
