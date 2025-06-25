const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });
};

