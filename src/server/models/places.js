"use strict";
module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define(
    "Places",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      vicinity: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.DECIMAL, allowNull: false },
      lng: { type: DataTypes.DECIMAL, allowNull: false },
      place_id: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {}
  );
  Places.associate = function(models) {
    // associations can be defined here
    Places.belongsToMany(models.Users, {
      through: models.UserPlaces,
      foreignKey: "place_id" /* id generated by db */,
      as: "users"
    });
    Places.hasMany(models.Contents, {
      foreignKey: "place_id",
      as: "contents",
      onDelete: "CASCADE"
    });
  };
  return Places;
};
