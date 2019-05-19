"use strict";
module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define(
    "Places",
    {
      place_id: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "place_id required" },
        unique: {
          args: true,
          msg: "Place already exists"
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Name of place is required" }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Address of place is required" }
      },
      vicinity: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Vicinity of place is required" }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Type of place is required" }
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: { args: false, msg: "Position of place is required" }
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: { args: false, msg: "Position of place is required" }
      }
    },
    {}
  );
  Places.associate = function(models) {
    // associations can be defined here
    Places.belongsToMany(models.Users, {
      through: "UserPlaces",
      as: "places",
      foreignKey: "place_id"
    });
  };
  return Places;
};
