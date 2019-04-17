"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserLogins = sequelize.define(
    "UserLogins",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your username"
        },
        validate: {
          isNotShort: value => {
            if (value.length < 6) {
              throw new Error("Username should be at least 6 characters");
            }
          }
        },
        unique: {
          args: true,
          msg: "Username already exists"
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Please enter your password" },
        validate: {
          isNotShort: value => {
            if (value.length < 6) {
              throw new Error("Password should be at least 6 characters");
            }
          }
        }
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  UserLogins.associate = function(models) {
    // associations can be defined here
  };
  return UserLogins;
};
