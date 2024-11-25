import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Postura = sequelize.define('Postura', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER, // tiempo que se debe sostener la postura
    allowNull: false,
  },
  instrucciones: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Postura;

