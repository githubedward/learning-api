'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLogins = sequelize.define('UserLogins', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  UserLogins.associate = function(models) {
    // associations can be defined here
  };
  return UserLogins;
};