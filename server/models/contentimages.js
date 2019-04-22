"use strict";
module.exports = (sequelize, DataTypes) => {
  const ContentImages = sequelize.define(
    "ContentImages",
    {
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      content_id: { type: DataTypes.INTEGER, allowNull: false },
      timestamp: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  ContentImages.associate = function(models) {
    // associations can be defined here
  };
  return ContentImages;
};
