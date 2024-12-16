import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Postura = sequelize.define(
  'Postura',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER, // tiempo recomendado para sostener la postura
      allowNull: false,
    },
    instrucciones: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imagenUrl: {
      type: DataTypes.STRING, // URL para la imagen de la postura
      allowNull: true,
    },
    tiempoPracticado: {
      type: DataTypes.INTEGER, // tiempo total en segundos practicado por el usuario
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default Postura;

