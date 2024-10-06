require("dotenv").config();

let sslOptions = {};
if (process.env.DB_SSL === "true") {
  sslOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: sslOptions,
    dialectModule: require("mysql2"),
    logging: false,
  },
};
