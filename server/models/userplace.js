'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPlace = sequelize.define('UserPlace', {
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
  }, {});
  UserPlace.associate = function(models) {
    // associations can be defined here
  };
  return UserPlace;
};