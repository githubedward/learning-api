"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPlaces = sequelize.define(
    "UserPlaces",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      place_id /* id generated by db */: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  UserPlaces.associate = function(models) {
    // associations can be defined here
  };
  return UserPlaces;
};