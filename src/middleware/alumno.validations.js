import { body, validationResult } from 'express-validator';

// Validaciones para el registro de alumnos
export const validarRegistroAlumno = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
  body('email')
    .isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validaciones para el login de alumnos
export const validarLoginAlumno = [
  body('email')
    .isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
