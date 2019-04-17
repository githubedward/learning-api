"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name"
        }
      },
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
      avatar: { type: DataTypes.STRING },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "New beginnings"
      }
    },
    {}
  );
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
