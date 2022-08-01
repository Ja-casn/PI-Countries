const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('touristActivity', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      someAttribute: {
        min: 1.0,
        max: 5.0
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season: {
      type: DataTypes.ENUM('Summer', 'Winter', 'Autumn', 'Spring'),
      allowNull: true
    }
  }, {
    timestamps: false
  });
};
