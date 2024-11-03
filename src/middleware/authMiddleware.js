// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token recibido:', token);
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided, access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.alumnoId = decoded.id;
    req.role = decoded.role || (decoded.isAdmin ? 'admin' : 'user'); // Asegurarnos que role se asigna

    console.log('Token decodificado:', decoded);
    console.log('Rol del usuario:', req.role);

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware para restringir solo a administradores
export const adminOnly = (req, res, next) => {
  console.log('Rol actual del usuario en adminOnly:', req.role);
  
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, admin only' });
  }

  next();
};



// // middleware/authAlumnoOnly.js
// export const authAlumnoOnly = (req, res, next) => {
//   if (req.user?.isAdmin) { // Si es admin, denegar acceso
//     return res.status(403).json({ error: 'Access denied, admin only' });
//   }
//   next(); // Continuar si es un alumno
// };




// // middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config.js';

// export const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
//   console.log('Token:',token)
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided, access denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.alumnoId = decoded.id;
//     req.role = decoded.role; // Guardar si el usuario es administrador
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Middleware para restringir solo a administradores
// export const adminOnly = (req, res, next) => {
//   if (req.role !== 'admin') {
//     return res.status(403).json({ error: 'Access denied, admin only' });
//   }
//   next();
// };


