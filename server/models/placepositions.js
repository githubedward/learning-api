'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlacePositions = sequelize.define('PlacePositions', {
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER,
    place_id: DataTypes.STRING
  }, {});
  PlacePositions.associate = function(models) {
    // associations can be defined here
  };
  return PlacePositions;
};