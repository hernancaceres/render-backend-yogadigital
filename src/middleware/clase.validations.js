import { body, validationResult } from 'express-validator';

// Validaciones para crear clase
export const validarClase = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria'),
  body('duracion')
    .isInt({ min: 1 }).withMessage('La duración debe ser un número mayor a 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
