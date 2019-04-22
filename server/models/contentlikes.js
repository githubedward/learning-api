"use strict";
module.exports = (sequelize, DataTypes) => {
  const ContentLikes = sequelize.define(
    "ContentLikes",
    {
      content_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      timestamp: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  ContentLikes.associate = function(models) {
    // associations can be defined here
  };
  return ContentLikes;
};
