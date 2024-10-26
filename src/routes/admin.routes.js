// routes/admin.routes.js
import express from 'express';
import { registrarAdmin, loginAdmin, obtenerPerfilAdmin, logoutAdmin } from '../controllers/admin.controller.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';


const router = express.Router();

// Rutas de autenticación del administrador
router.post('/registrar', registrarAdmin);
router.post('/login', loginAdmin);

// Ruta protegida para obtener el perfil del administrador autenticado
router.get('/perfil', authMiddleware, obtenerPerfilAdmin);
router.post('/logout', authMiddleware, logoutAdmin);

export default router;
