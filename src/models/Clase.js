import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Postura from './Postura.js';

const Clase = sequelize.define('Clase', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duracion: {
    type: DataTypes.INTEGER, // en minutos
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
}, {
  timestamps: true,
});

// Relación de Clase a Postura (una clase puede tener muchas posturas)
Clase.hasMany(Postura, { foreignKey: 'claseId', as: 'posturas' });
Postura.belongsTo(Clase, { foreignKey: 'claseId' });

export default Clase;



// import { DataTypes } from 'sequelize';
// import sequelize from '../database/database.js';
// import Postura from './Postura.js';

// const Clase = sequelize.define('Clase', {
//   titulo: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   descripcion: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   duracion: {
//     type: DataTypes.INTEGER, // en minutos
//     allowNull: false,
//   },
// }, {
//   timestamps: true,
// });

// // Relación de Clase a Postura (una clase puede tener muchas posturas)
// Clase.hasMany(Postura, { foreignKey: 'claseId', as: 'Posturas' });
// Postura.belongsTo(Clase, { foreignKey: 'claseId' });

// export default Clase;
