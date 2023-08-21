'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actionr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Actionr.init({
    idUsuario: DataTypes.STRING,
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actionr',
  });
  return Actionr;
};