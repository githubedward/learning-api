"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserLogins = sequelize.define("UserLogins", {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your username"
      },
      unique: {
        args: true,
        msg: "Username already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: "Please enter your password" }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: { args: false }
    }
  });
  UserLogins.associate = function(models) {
    // associations can be defined here
  };
  return UserLogins;
};
