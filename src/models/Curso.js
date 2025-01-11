import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Clase from './Clase.js';
import Alumno from './Alumno.js';

const Curso = sequelize.define('Curso', {
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
  duracionTotal: {
    type: DataTypes.INTEGER, // Duración total del curso en minutos
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  imagenUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Relación de Curso a Clase (un curso tiene muchas clases)
Curso.hasMany(Clase, { foreignKey: 'cursoId', as: 'clases' });
Clase.belongsTo(Curso, { foreignKey: 'cursoId' });

// Relación de Curso a Alumno (un alumno puede estar en muchos cursos y viceversa)
Curso.belongsToMany(Alumno, { through: 'AlumnoCursos', foreignKey: 'cursoId' });
Alumno.belongsToMany(Curso, { through: 'AlumnoCursos', foreignKey: 'alumnoId' });

export default Curso;
