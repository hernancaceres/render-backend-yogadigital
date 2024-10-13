import Postura from '../models/Postura.js';

// Crear una nueva postura
export const crearPostura = async (req, res) => {
  const { nombre, descripcion, duracion, claseId } = req.body;
  try {
    const nuevaPostura = await Postura.create({ nombre, descripcion, duracion, claseId });
    res.json(nuevaPostura);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la postura' });
  }
};

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
