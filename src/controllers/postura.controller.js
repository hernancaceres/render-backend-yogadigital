import Clase from '../models/Clase.js';
import Postura from '../models/Postura.js';

// Crear una nueva postura
export const crearPostura = async (req, res) => {
  const { nombre, descripcion, duracion, instrucciones, imagenUrl } = req.body;
  const { claseId } = req.params; // ID de la clase, si está disponible en la ruta

  try {
    console.log('Datos recibidos para crear postura:', { nombre, descripcion, duracion, instrucciones, imagenUrl, claseId });

    // Verificar si la postura debe asociarse con una clase específica
    if (claseId) {
      // Validar que la clase exista
      const clase = await Clase.findByPk(claseId);
      if (!clase) {
        return res.status(404).json({ error: 'Clase no encontrada' });
      }

      // Crear la postura y asociarla a la clase
      const nuevaPostura = await Postura.create({
        nombre,
        descripcion,
        duracion,
        instrucciones,
        imagenUrl, // Nuevo campo
        tiempoPracticado: 0, // Inicializado en 0
        claseId: clase.id,
      });

      console.log('Postura creada y asociada a la clase:', nuevaPostura);
      return res.status(201).json({
        message: 'Postura creada y asociada a la clase exitosamente',
        postura: nuevaPostura,
      });
    } else {
      // Crear una postura sin clase específica
      const nuevaPostura = await Postura.create({
        nombre,
        descripcion,
        duracion,
        instrucciones,
        imagenUrl, // Nuevo campo
        tiempoPracticado: 0, // Inicializado en 0
      });

      console.log('Postura creada exitosamente sin clase:', nuevaPostura);
      return res.status(201).json(nuevaPostura);
    }
  } catch (error) {
    console.error('Error al crear la postura:', error);
    res.status(500).json({ error: 'Error al crear la postura', detalles: error.message });
  }
};



// // Crear una nueva postura
// export const crearPostura = async (req, res) => {
//   const { nombre, descripcion, duracion, instrucciones } = req.body;
//   const { claseId } = req.params; // ID de la clase, si está disponible en la ruta

//   try {
//     console.log('Datos recibidos para crear postura:', { nombre, descripcion, duracion, instrucciones, claseId });

//     // Verificar si la postura debe asociarse con una clase específica
//     if (claseId) {
//       // Validar que la clase exista
//       const clase = await Clase.findByPk(claseId);
//       if (!clase) {
//         return res.status(404).json({ error: 'Clase no encontrada' });
//       }

//       // Crear la postura y asociarla a la clase
//       const nuevaPostura = await Postura.create({ nombre, descripcion, duracion, instrucciones, claseId: clase.id });

//       console.log('Postura creada y asociada a la clase:', nuevaPostura);
//       return res.status(201).json({
//         message: 'Postura creada y asociada a la clase exitosamente',
//         postura: nuevaPostura,
//       });
//     } else {
//       // Crear una postura sin clase específica
//       const nuevaPostura = await Postura.create({ nombre, descripcion, duracion, instrucciones });
//       console.log('Postura creada exitosamente sin clase:', nuevaPostura);
//       return res.status(201).json(nuevaPostura);
//     }
//   } catch (error) {
//     console.error('Error al crear la postura:', error);
//     res.status(500).json({ error: 'Error al crear la postura', detalles: error.message });
//   }
// };

// // Crear una nueva postura
// export const crearPostura = async (req, res) => {
//   const { nombre, descripcion, duracion, claseId } = req.body;
//   try {
//     const nuevaPostura = await Postura.create({ nombre, descripcion, duracion, claseId });
//     res.json(nuevaPostura);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear la postura' });
//   }
// };

// Obtener todas las posturas
export const obtenerPosturas = async (req, res) => {
  try {
    const posturas = await Postura.findAll();
    res.json(posturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las posturas' });
  }
};

// Obtener una postura por ID
export const obtenerPosturaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const postura = await Postura.findByPk(id);
    if (!postura) {
      return res.status(404).json({ error: 'Postura no encontrada' });
    }
    res.json(postura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la postura' });
  }
};

// Actualizar una postura
export const actualizarPostura = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, duracion } = req.body;
  try {
    const postura = await Postura.findByPk(id);
    if (!postura) {
      return res.status(404).json({ error: 'Postura no encontrada' });
    }
    postura.nombre = nombre;
    postura.descripcion = descripcion;
    postura.instrucciones = instrucciones;
    postura.duracion = duracion;
    await postura.save();
    res.json(postura);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la postura' });
  }
};

// Eliminar una postura
export const eliminarPostura = async (req, res) => {
  const { id } = req.params;
  try {
    const postura = await Postura.findByPk(id);
    if (!postura) {
      return res.status(404).json({ error: 'Postura no encontrada' });
    }
    await postura.destroy();
    res.json({ message: 'Postura eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la postura' });
  }
};
