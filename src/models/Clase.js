import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Postura from './Postura.js';

const Clase = sequelize.define('Clase', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER, // en minutos
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Relación de Clase a Postura (una clase puede tener muchas posturas)
Clase.hasMany(Postura, { foreignKey: 'claseId' });
Postura.belongsTo(Clase, { foreignKey: 'claseId' });

export default Clase;
