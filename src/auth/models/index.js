"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const userSchema = require("./users.js");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : 'postgres://localhost:5432/bearerauth';

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  Users: userSchema(sequelize, DataTypes),
};
