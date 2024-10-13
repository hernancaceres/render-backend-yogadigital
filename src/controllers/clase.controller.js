import Clase from '../models/Clase.js';

// Crear una nueva clase
export const crearClase = async (req, res) => {
    const { titulo, descripcion, duracion } = req.body;
    try {
      console.log('Datos recibidos para crear clase:', { titulo, descripcion, duracion });
      
      const nuevaClase = await Clase.create({ titulo, descripcion, duracion });
      
      console.log('Clase creada exitosamente:', nuevaClase);
      res.json(nuevaClase);
    } catch (error) {
      console.error('Error al crear la clase:', error); // Log del error
      res.status(500).json({ error: 'Error al crear la clase', detalles: error.message });
    }
  };

// Obtener todas las clases
export const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.findAll();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las clases' });
  }
};

// Obtener una clase por ID
export const obtenerClasePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const clase = await Clase.findByPk(id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(clase);
  } catch (error) {
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
