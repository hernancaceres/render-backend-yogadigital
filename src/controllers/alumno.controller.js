import Alumno from '../models/Alumno.js';

// Crear un nuevo alumno
export const crearAlumno = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const nuevoAlumno = await Alumno.create({ nombre, email });
    res.json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alumno' });
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
  const { nombre, email } = req.body;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    alumno.nombre = nombre;
    alumno.email = email;
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

// // Obtener el progreso de un alumno
// export const obtenerProgreso = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const alumno = await Alumno.findByPk(id);
//     if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
//     res.json(alumno.progreso);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el progreso del alumno' });
//   }
// };

// // Actualizar el progreso del alumno
// export const actualizarProgreso = async (req, res) => {
//   const { id } = req.params;
//   const { progreso } = req.body;
//   try {
//     const alumno = await Alumno.findByPk(id);
//     if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });

//     alumno.progreso = progreso;
//     await alumno.save();
//     res.json(alumno);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el progreso' });
//   }
// };
