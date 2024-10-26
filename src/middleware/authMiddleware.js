// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided, access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.alumnoId = decoded.id;
    req.role = decoded.role; // Guardar si el usuario es administrador
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware para restringir solo a administradores
export const adminOnly = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, admin only' });
  }
  next();
};


// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config.js';

// const authMiddleware = (req, res, next) => {
//   console.log('Middleware de autenticación ejecutado'); // Log de inicio

//   // Intentar leer el token desde las cookies
//   const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     console.log('Token no proporcionado'); // Log si no hay token
//     return res.status(401).json({ error: 'No token provided, access denied' });
//   }

//   try {
//     // Verificar el token y decodificarlo
//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log('Token decodificado:', decoded); // Log del contenido del token

//     req.alumnoId = decoded.id; // Extraer el ID del alumno del token
//     req.isAdmin = decoded.isAdmin; // Obtener el rol de administrador desde el token

//     next();
//   } catch (error) {
//     console.error('Error al verificar el token:', error.message); // Log si hay error con el token
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Middleware para verificar si el usuario es administrador
// export const adminOnly = (req, res, next) => {
//   if (!req.isAdmin) {
//     return res.status(403).json({ error: 'Access denied, admin only' });
//   }
//   next();
// };

// export default authMiddleware;

