"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define(
    "Contents",
    {
      text: { type: DataTypes.STRING, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      place_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  Contents.associate = function(models) {
    // associations can be defined here
    Contents.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user"
    });
    Contents.belongsTo(models.Places, {
      foreignKey: "place_id",
      as: "place",
      onDelete: "CASCADE"
    });
    Contents.hasMany(models.ContentImages, {
      foreignKey: "content_id",
      as: "images",
      onDelete: "CASCADE"
    });
    Contents.hasMany(models.ContentLikes, {
      foreignKey: "content_id",
      as: "likes",
      onDelete: "CASCADE"
    });
  };
  return Contents;
};
