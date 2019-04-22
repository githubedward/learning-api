"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name"
      }
    },
    avatarUrl: { type: DataTypes.STRING },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "New beginnings"
    }
  });
  Users.associate = function(models) {
    Users.hasOne(models.UserLogins, {
      foreignKey: "user_id",
      as: "logins",
      onDelete: "CASCADE"
    });
    Users.belongsToMany(models.Places, {
      through: models.UserPlaces,
      foreignKey: "user_id",
      as: "places",
      onDelete: "CASCADE"
    });
    Users.hasMany(models.Contents, {
      foreignKey: "user_id",
      as: "contents",
      onDelete: "CASCADE"
    });
  };
  return Users;
};
