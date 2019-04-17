'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define('Contents', {
    text: DataTypes.STRING,
    likes: DataTypes.ARRAY,
    userplace_id: DataTypes.INTEGER
  }, {});
  Contents.associate = function(models) {
    // associations can be defined here
  };
  return Contents;
};