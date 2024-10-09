import jwt from 'jsonwebtoken';
import { config } from '../../config.js';

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token requerido' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};
