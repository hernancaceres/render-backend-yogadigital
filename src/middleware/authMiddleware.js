import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const authMiddleware = (req, res, next) => {
  console.log('Middleware de autenticación ejecutado'); // Log de inicio
  
  // Intentar leer el token desde las cookies
  const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    console.log('Token no proporcionado'); // Log si no hay token
    return res.status(401).json({ error: 'No token provided, access denied' });
  }

  try {
    // Verificar el token y decodificarlo
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decodificado:', decoded); // Log del contenido del token
    req.alumnoId = decoded.id; // Extraer el ID del alumno del token
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message); // Log si hay error con el token
    return res.status(401).json({ error: 'Invalid token' });
  }
};


export default authMiddleware;

