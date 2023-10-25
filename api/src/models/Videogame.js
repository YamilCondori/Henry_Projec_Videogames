const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    idDB:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB
    },
    releaseDate: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.STRING
    }
  });
};
