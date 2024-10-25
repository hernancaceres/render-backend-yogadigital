import { body, validationResult } from 'express-validator';

// Validaciones para crear curso
export const validarCurso = [
  body('titulo')
    .notEmpty().withMessage('El nombre del curso es obligatorio'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria'),
  body('duracionTotal')
  .isInt({ min: 1 }).withMessage('La duración debe ser un número mayor a 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];



// Validaciones para asignar un alumno a un curso
export const validarAsignacionCurso = [
  body('cursoId')
    .isInt().withMessage('El ID del curso debe ser un número válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


// Validaciones para actualizar progreso de un curso
export const validarActualizarProgreso = [
  body('cursoId')
    .isInt().withMessage('El ID del curso debe ser un número válido'),
  body('alumnoId')
    .isInt().withMessage('El ID del alumno debe ser un número válido'),
  body('progreso')
    .isFloat({ min: 0, max: 100 }).withMessage('El progreso debe ser un porcentaje entre 0 y 100'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
