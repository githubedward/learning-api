'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContentImages = sequelize.define('ContentImages', {
    content_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  ContentImages.associate = function(models) {
    // associations can be defined here
  };
  return ContentImages;
};