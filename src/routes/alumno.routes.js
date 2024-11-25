import express from 'express';
import { validarRegistroAlumno, validarLoginAlumno } from '../middleware/alumno.validations.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import {
  registrarAlumno,
  loginAlumno,
  obtenerPerfil,
  logoutAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno,

} from '../controllers/alumno.controller.js';

const router = express.Router();

// Rutas públicas
router.post('/registrar', validarRegistroAlumno, registrarAlumno);
router.post('/login', validarLoginAlumno, loginAlumno);

// Rutas protegidas solo para administradores
router.get('/', authMiddleware, adminOnly, obtenerAlumnos); // Obtener todos los alumnos solo si eres admin
router.get('/:id', authMiddleware, adminOnly, obtenerAlumnoPorId); // Obtener un alumno por ID solo si eres admin
router.put('/:id', authMiddleware, adminOnly, actualizarAlumno); // Actualizar un alumno solo si eres admin
router.delete('/:id', authMiddleware, adminOnly, eliminarAlumno); // Eliminar un alumno solo si eres admin

// Ruta protegida para obtener el perfil del alumno autenticado
router.get('/perfil/perfil', authMiddleware, obtenerPerfil);
router.post('/logout', authMiddleware, logoutAlumno);


export default router;

