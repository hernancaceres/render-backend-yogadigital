import { Router } from 'express';
import { validarPostura } from '../middleware/postura.validations.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import {
  crearPostura,
  obtenerPosturas,
  obtenerPosturaPorId,
  actualizarPostura,
  eliminarPostura
} from '../controllers/postura.controller.js';

const router = Router();

// Ruta para crear una postura independiente
router.post('/posturas',authMiddleware, adminOnly, validarPostura, crearPostura);

// Ruta para crear una postura dentro de una clase específica
router.post('/clases/:claseId/posturas', authMiddleware, adminOnly, validarPostura, crearPostura);

// Obtener todas las posturas
router.get('/posturas', obtenerPosturas);

// Obtener una postura por ID
router.get('/posturas/:id', obtenerPosturaPorId);

// Actualizar una postura por ID
router.put('/posturas/:id', actualizarPostura);

// Eliminar una postura por ID
router.delete('/posturas/:id', eliminarPostura);

export default router;
