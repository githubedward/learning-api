'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlacesPosition = sequelize.define('PlacesPosition', {
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER
  }, {});
  PlacesPosition.associate = function(models) {
    // associations can be defined here
  };
  return PlacesPosition;
};