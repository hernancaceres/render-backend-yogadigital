import { body, validationResult } from 'express-validator';

// Validaciones para crear una entrada de blog
export const validarCrearBlog = [
  body('titulo')
    .notEmpty().withMessage('El título del blog es obligatorio')
    .isLength({ max: 255 }).withMessage('El título no debe superar los 255 caracteres'),

  body('descripcion')
    .notEmpty().withMessage('La descripción del blog es obligatoria'),

  body('imagenUrl')
    .optional()
    .isURL().withMessage('La URL de la imagen no es válida'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validaciones para actualizar una entrada de blog
export const validarActualizarBlog = [
  body('titulo')
    .optional()
    .notEmpty().withMessage('El título del blog no puede estar vacío')
    .isLength({ max: 255 }).withMessage('El título no debe superar los 255 caracteres'),

  body('descripcion')
    .optional()
    .notEmpty().withMessage('La descripción del blog no puede estar vacía'),

  body('imagenUrl')
    .optional()
    .isURL().withMessage('La URL de la imagen no es válida'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
