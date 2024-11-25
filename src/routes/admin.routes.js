// routes/admin.routes.js
import express from 'express';
import { registrarAdmin, loginAdmin, obtenerPerfilAdmin,  logoutAdmin } from '../controllers/admin.controller.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import { validarRegistroAdmin, validarLoginAdmin } from '../middleware/admin.validations.js';



const router = express.Router();

// Rutas de autenticación del administrador
router.post('/registrar',validarRegistroAdmin, registrarAdmin);
router.post('/login',validarLoginAdmin, loginAdmin);

// Ruta protegida para obtener el perfil del administrador autenticado
router.get('/perfil', authMiddleware, adminOnly, obtenerPerfilAdmin);
router.post('/logout', authMiddleware, adminOnly, logoutAdmin);

export default router;
