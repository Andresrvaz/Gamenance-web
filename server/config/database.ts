module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "Gamenance",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: true,
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
