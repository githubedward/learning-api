'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};