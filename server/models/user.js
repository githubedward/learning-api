"use strict";
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
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
        unique: { args: true, msg: "Username already exists" }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "Email address already registered" },
        validate: {
          isValid: value => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
              throw new Error("Please enter valid email");
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Please enter your password" },
        validate: {
          isNotShort: value => {
            if (value.length < 8) {
              throw new Error("Password should be at least 8 characters");
            }
          }
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
  };
  return User;
};
