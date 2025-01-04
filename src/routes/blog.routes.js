import express from 'express';
import {
    obtenerBlogPorId,
    crearBlog,
    actualizarBlog,
    eliminarBlog,
    obtenerBlogs,
} from '../controllers/blog.controller.js';

import { validarCrearBlog, validarActualizarBlog } from '../middleware/blog.validations.js';

const router = express.Router();

// Definir rutas para el blog
router.get('/', obtenerBlogs);                                       // Obtener todas las entradas de blog
router.get('/:id', obtenerBlogPorId);                                // Obtener una entrada por ID
router.post('/', validarCrearBlog, crearBlog);
router.put('/:id', validarActualizarBlog, actualizarBlog);           // Actualizar una entrada existente
router.delete('/:id', eliminarBlog);                                 // Eliminar una entrada

export default router;
