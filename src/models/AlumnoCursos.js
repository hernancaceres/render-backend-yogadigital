// AlumnoCursos.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Alumno from './Alumno.js';
import Curso from './Curso.js';

class AlumnoCursos extends Model { }

AlumnoCursos.init({
  progreso: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  alumnoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Alumno,
      key: 'id',
    },
  },
  cursoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Curso,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'AlumnoCursos',
});

// Relaciones
Alumno.belongsToMany(Curso, { through: AlumnoCursos, as: 'cursos', foreignKey: 'alumnoId' });
Curso.belongsToMany(Alumno, { through: AlumnoCursos, as: 'alumnos', foreignKey: 'cursoId' });

export default AlumnoCursos;
