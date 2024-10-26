
import Alumno from '../models/Alumno.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Registrar un nuevo alumno con contraseña encriptada
export const registrarAlumno = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoAlumno = await Alumno.create({
      nombre,
      email,
      password: hashedPassword
    });

    res.json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el alumno' });
  }
};

// Iniciar sesión (Login)
export const loginAlumno = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alumno = await Alumno.findOne({ where: { email } });

    if (!alumno) {
      return res.status(404).json({ error: 'Email o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, alumno.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    // Crear JWT token
    const token = jwt.sign({ id: alumno.id, nombre: alumno.nombre,isAdmin: alumno.isAdmin }, JWT_SECRET, {
      expiresIn: '1h' // El token expira en 1 hora
    });

    // Establecer el token como una cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });

    res.json({ message: 'Inicio de sesión exitoso', alumno: { id: alumno.id, nombre: alumno.nombre } });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión', detalles: error.message });
  }
};



// // Iniciar sesión (Login)
// export const loginAlumno = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const alumno = await Alumno.findOne({ where: { email } });

//     if (!alumno) {
//       return res.status(404).json({ error: 'Email o contraseña incorrectos' });
//     }

//     const isMatch = await bcrypt.compare(password, alumno.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: 'Email o contraseña incorrectos' });
//     }

//     // Crear JWT token
//     const token = jwt.sign({ id: alumno.id, nombre: alumno.nombre }, JWT_SECRET, {
//       expiresIn: '1h' // El token expira en 1 hora
//     });

//     // Establecer el token como una cookie
//     res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });

//     res.json({ message: 'Inicio de sesión exitoso', alumno: { id: alumno.id, nombre: alumno.nombre } });
//   } catch (error) {
//     console.error('Error en el login:', error);
//     res.status(500).json({ error: 'Error al iniciar sesión', detalles: error.message });
//   }
// };


// Obtener perfil del alumno autenticado


export const obtenerPerfil = async (req, res) => {
  try {
    console.log('ID de alumno recibido en el perfil:', req.alumnoId); // Log para ver si se pasa el ID correcto
    const alumno = await Alumno.findByPk(req.alumnoId); // Usa el ID del token
    if (!alumno) {
      console.log('Alumno no encontrado');
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    console.error('Error al obtener el perfil del alumno:', error.message);
    res.status(500).json({ error: 'Error al obtener el perfil del alumno' });
  }
};


// Obtener todos los alumnos
export const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll(); // Consulta todos los alumnos
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
};

// Obtener un alumno por ID
export const obtenerAlumnoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id); // Busca por Primary Key (ID)
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
};

// Actualizar un alumno por ID
export const actualizarAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    alumno.nombre = nombre;
    alumno.email = email;
    alumno.password = password;
    await alumno.save();
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el alumno' });
  }
};

// Eliminar un alumno por ID
export const eliminarAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    await alumno.destroy();
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
};

// Middleware para verificar el token JWT
export const verificarToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No hay token, permiso denegado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.alumnoId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' });
  }
};

// Cerrar sesión (Logout)
export const logoutAlumno = (req, res) => {
  // Eliminar la cookie del token
  res.clearCookie('token');  // Borra la cookie con el token

  res.json({ message: 'Sesión cerrada correctamente' });
};

