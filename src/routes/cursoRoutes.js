import express from 'express';
import { validarCurso } from '../middleware/curso.validations.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';

import {
  crearCurso,
  obtenerCursos,
  obtenerCursoPorId,
  actualizarCurso,
  eliminarCurso,
  asignarAlumnoACurso,
  actualizarProgresoCurso,
  obtenerCursosPorAlumnoId
} from '../controllers/curso.controller.js';

const router = express.Router();

// Crear un nuevo curso
router.post('/cursos', authMiddleware, validarCurso, crearCurso);

// Obtener todos los cursos
router.get('/cursos', authMiddleware, obtenerCursos);

// Obtener un curso por ID
router.get('/cursos/:id', authMiddleware, obtenerCursoPorId);

// Actualizar un curso por ID
router.put('/cursos/:id', authMiddleware, validarCurso, actualizarCurso);

// Eliminar un curso por ID
router.delete('/cursos/:id', authMiddleware, eliminarCurso);

// Asignar un alumno a un curso
router.post('/cursos/:cursoId/alumnos', authMiddleware, asignarAlumnoACurso);

// Actualizar el progreso de un alumno en un curso
router.put('/cursos/:cursoId/alumnos/:alumnoId/progreso', authMiddleware, actualizarProgresoCurso);

// Obtener cursos por alumnoId
router.get('/alumnos/:alumnoId/cursos', authMiddleware, obtenerCursosPorAlumnoId);


export default router;


