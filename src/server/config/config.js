import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    username: "webedward",
    password: "password",
    database: "pinit2",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
