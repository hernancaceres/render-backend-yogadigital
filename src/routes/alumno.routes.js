import express from 'express';
import { validarRegistroAlumno, validarLoginAlumno } from '../middleware/alumno.validations.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  registrarAlumno,
  loginAlumno,
  obtenerPerfil,
  logoutAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno

} from '../controllers/alumno.controller.js';

const router = express.Router();

// Rutas públicas
router.post('/registrar', validarRegistroAlumno, registrarAlumno);
router.post('/login', validarLoginAlumno, loginAlumno);

// Ruta para obtener todos los alumnos
router.get('/', obtenerAlumnos);

// Ruta para obtener un alumno por ID
router.get('/:id', obtenerAlumnoPorId);

// Ruta para actualizar un alumno por ID
router.put('/:id', actualizarAlumno);

// Ruta para eliminar un alumno por ID
router.delete('/:id', eliminarAlumno);

// Ruta protegida para obtener el perfil del alumno autenticado
router.get('/perfil/:id', authMiddleware, obtenerPerfil);
router.post('/logout', authMiddleware, logoutAlumno);

export default router;




// import { Router } from 'express';
// import { crearAlumno, obtenerAlumnos,obtenerAlumnoPorId,actualizarAlumno,eliminarAlumno } from '../controllers/alumno.controller.js';

// const router = Router();

// router.get('/alumnos', (req, res) => { res.send("obteniendo usuarios") });

// router.post('/crear', crearAlumno);

// // Ruta para obtener todos los alumnos
// router.get('/', obtenerAlumnos);

// // Ruta para obtener un alumno por ID
// router.get('/:id', obtenerAlumnoPorId);

// // Ruta para actualizar un alumno por ID
// router.put('/:id', actualizarAlumno);

// // Ruta para eliminar un alumno por ID
// router.delete('/:id', eliminarAlumno);

// //router.get('/alumnos/:id/progreso', obtenerProgreso);
// // router.put('/alumnos/:id/progreso', actualizarProgreso);

// export default router;
