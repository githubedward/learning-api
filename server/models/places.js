'use strict';
module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define('Places', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    vicinity: DataTypes.STRING,
    position_id: DataTypes.INTEGER
  }, {});
  Places.associate = function(models) {
    // associations can be defined here
  };
  return Places;
};