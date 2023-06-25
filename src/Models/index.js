'use strict'
require('dotenv').config();
const users = require('./user')
const { Sequelize, DataTypes } = require('sequelize');
const POSTGRES_URI= process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL;
const sequelize = new Sequelize(POSTGRES_URI, {});

const usersTable = users(sequelize, DataTypes)

module.exports = {
  sequelize: sequelize,
  usersTable: usersTable,
}