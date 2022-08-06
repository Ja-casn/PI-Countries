const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    area: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    codecountry:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });
};
