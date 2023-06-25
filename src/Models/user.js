'use strict'

const users = (sequelize, DataTypes) => {
  return (
    sequelize.define('users', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  )
}

module.exports = users