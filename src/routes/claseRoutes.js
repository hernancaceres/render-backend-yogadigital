import express from 'express';
import { validarClase } from '../middleware/clase.validations.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';

import {
  crearClase,
  obtenerClases,
  obtenerClasePorId,
  actualizarClase,
  eliminarClase
} from '../controllers/clase.controller.js';

const router = express.Router();

// Ruta para crear una clase independiente
router.post('/clases', authMiddleware, validarClase, crearClase);

// Ruta para crear una clase dentro de un curso específico
router.post('/cursos/:cursoId/clases', authMiddleware, validarClase, crearClase);

// Obtener todas las clases
router.get('/clases', obtenerClases);

// Obtener una clase por ID
router.get('/clases/:id', obtenerClasePorId);

// Actualizar una clase por ID
router.put('/clases/:id', actualizarClase);

// Eliminar una clase por ID
router.delete('/clases/:id', eliminarClase);

export default router;
