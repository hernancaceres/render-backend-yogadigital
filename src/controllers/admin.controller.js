// controllers/admin.controller.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Registrar un nuevo administrador
export const registrarAdmin = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoAdmin = await Admin.create({
            nombre,
            email,
            password: hashedPassword,
        });

        res.json(nuevoAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el administrador' });
    }
};

// Iniciar sesión (Login)
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(404).json({ error: 'Email o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Email o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: admin.id, nombre: admin.nombre, role: 'admin' }, JWT_SECRET, {
            expiresIn: '1h',
        });
        
        // Set cookie with token
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.json({ message: 'Inicio de sesión exitoso', admin: { id: admin.id, nombre: admin.nombre } });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener perfil del administrador autenticado
export const obtenerPerfilAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil del administrador' });
    }
};

// Cerrar sesión (Logout)
export const logoutAdmin = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada correctamente' });
};
