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
    { underscored: true }
  );
  Users.associate = function(models) {
    Users.hasOne(models.UserLogins, {
      as: "Logins",
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };
  return Users;
};
