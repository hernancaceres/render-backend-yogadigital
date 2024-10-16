import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  crearClase,
  obtenerClases,
  obtenerClasePorId,
  actualizarClase,
  eliminarClase
} from '../controllers/clase.controller.js';

const router = express.Router();

// Crear una nueva clase
router.post('/clases', authMiddleware, crearClase);

// Obtener todas las clases
router.get('/clases', obtenerClases);

// Obtener una clase por ID
router.get('/clases/:id', obtenerClasePorId);

// Actualizar una clase por ID
router.put('/clases/:id', actualizarClase);

// Eliminar una clase por ID
router.delete('/clases/:id', eliminarClase);

export default router;
