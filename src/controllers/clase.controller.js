import Curso from '../models/Curso.js';
import Clase from '../models/Clase.js';
import Postura from '../models/Postura.js';

// Crear una nueva clase

export const crearClase = async (req, res) => {
  const { titulo, descripcion, duracion } = req.body;
  const { cursoId } = req.params; // ID del curso, si está disponible

  try {
    console.log('Datos recibidos para crear clase:', { titulo, descripcion, duracion, cursoId });

    // Verificar si la clase debe asociarse con un curso específico
    if (cursoId) {
      // Validar que el curso exista
      const curso = await Curso.findByPk(cursoId);
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
      }

      // Crear la clase y asociarla al curso
      const nuevaClase = await Clase.create({ titulo, descripcion, duracion, cursoId: curso.id });

      console.log('Clase creada y asociada al curso:', nuevaClase);
      return res.status(201).json({
        message: 'Clase creada y asociada al curso exitosamente',
        clase: nuevaClase,
      });
    } else {
      // Crear una clase independiente
      const nuevaClase = await Clase.create({ titulo, descripcion, duracion });
      console.log('Clase creada exitosamente sin curso:', nuevaClase);
      return res.status(201).json(nuevaClase);
    }
  } catch (error) {
    console.error('Error al crear la clase:', error);
    res.status(500).json({ error: 'Error al crear la clase', detalles: error.message });
  }
};

// Obtener todas las clases con las posturas asociadas
export const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.findAll({
      include: [
        {
          model: Postura,
          as: 'posturas', // Asegúrate de que el alias coincida con el que usaste en el modelo
        },
      ],
    });
    res.json(clases);
  } catch (error) {
    console.error('Error al obtener las clases:', error);
    res.status(500).json({ error: 'Error al obtener las clases' });
  }
};




// // Obtener una clase por ID
// export const obtenerClasePorId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const clase = await Clase.findByPk(id);
//     if (!clase) {
//       return res.status(404).json({ error: 'Clase no encontrada' });
//     }
//     res.json(clase);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener la clase' });
//   }
// };

// Obtener una clase por ID
export const obtenerClasePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const clase = await Clase.findByPk(id, {
      include: [{
        model: Postura, // Modelo de posturas relacionadas
        as: 'posturas'  // Asegúrate de que coincide con el alias usado en las asociaciones
      }]
    });

    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    res.json(clase);
  } catch (error) {
    console.error('Error al obtener los detalles de la clase:', error);
    res.status(500).json({ error: 'Error al obtener la clase' });
  }
};




// Actualizar una clase
export const actualizarClase = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, duracion } = req.body;
  try {
    const clase = await Clase.findByPk(id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    clase.titulo = titulo;
    clase.descripcion = descripcion;
    clase.duracion = duracion;
    await clase.save();
    res.json(clase);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la clase' });
  }
};

// Eliminar una clase
export const eliminarClase = async (req, res) => {
  const { id } = req.params;
  try {
    const clase = await Clase.findByPk(id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    await clase.destroy();
    res.json({ message: 'Clase eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la clase' });
  }
};
