import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Alumno = sequelize.define('Alumno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  progreso: {
    type: DataTypes.FLOAT, // porcentaje de progreso en las clases
    defaultValue: 0,
  },
});

export default Alumno;
