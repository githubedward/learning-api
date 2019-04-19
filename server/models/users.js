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
    Users.hasOne(models.UserLogins, {
      onDelete: "CASCADE",
      foreignKey: "user_id",
      as: "logins"
    });
  };
  return Users;
};
