import Curso from '../models/Curso.js';
import Alumno from '../models/Alumno.js';
import Clase from '../models/Clase.js';
import AlumnoCursos from '../models/AlumnoCursos.js';

// Crear un nuevo curso
export const crearCurso = async (req, res) => {
    const { titulo, descripcion, duracionTotal } = req.body;
    try {
        console.log('Datos recibidos para crear curso:', { titulo, descripcion, duracionTotal });

        const nuevoCurso = await Curso.create({ titulo, descripcion, duracionTotal });

        console.log('Curso creado exitosamente:', nuevoCurso);
        res.json(nuevoCurso);
    } catch (error) {
        console.error('Error al crear el curso:', error);
        res.status(500).json({ error: 'Error al crear el curso', detalles: error.message });
    }
};

// Obtener todos los cursos
export const obtenerCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            include: [
                {
                    model: Clase,
                    as: 'clases',
                },
            ],
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};

// Obtener un curso por ID
export const obtenerCursoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findByPk(id, {
            include: [
                {
                    model: Clase,
                    as: 'clases',
                },
            ],
        });
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
};

// Actualizar un curso
export const actualizarCurso = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, duracionTotal } = req.body;
    try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        curso.titulo = titulo;
        curso.descripcion = descripcion;
        curso.duracionTotal = duracionTotal;
        await curso.save();
        res.json(curso);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el curso' });
    }
};

// Eliminar un curso
export const eliminarCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        await curso.destroy();
        res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el curso' });
    }
};

// Asignar alumno a un curso y registrar progreso
export const asignarAlumnoACurso = async (req, res) => {
    const { cursoId } = req.params; // Obtener el cursoId desde la URL
    const alumnoId = req.alumnoId;   // Obtener el alumnoId desde el token JWT

    try {
        const curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        const alumno = await Alumno.findByPk(alumnoId);
        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        // Asignar el alumno al curso
        await curso.addAlumno(alumno);

        res.json({ message: 'Alumno asignado al curso exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al asignar el alumno al curso' });
    }
};

// Actualizar progreso de alumno en un curso
export const actualizarProgresoCurso = async (req, res) => {
    const { cursoId, alumnoId } = req.params; // Extraer cursoId y alumnoId desde los parámetros de la URL
    const { progreso } = req.body; // Extraer el progreso desde el cuerpo de la solicitud

    try {
        const alumnoCurso = await AlumnoCursos.findOne({
            where: { cursoId, alumnoId },
        });

        if (!alumnoCurso) {
            return res.status(404).json({ error: 'Alumno no asignado a este curso' });
        }

        // Actualizar el progreso
        alumnoCurso.progreso = progreso;
        await alumnoCurso.save();

        res.json({ message: `Progreso del alumno en el curso ${cursoId} actualizado exitosamente` });
    } catch (error) {
        console.error(error); // Añadir para depuración
        res.status(500).json({ error: 'Error al actualizar el progreso del curso' });
    }
};


export const obtenerCursosPorAlumnoId = async (req, res) => {
    const alumnoIdSolicitado = parseInt(req.params.alumnoId, 10);

    // Asegurarse de que el alumno acceda solo a sus cursos
    if (alumnoIdSolicitado !== req.alumnoId) {
        console.log('Error: Acceso denegado, alumno no autorizado');
        return res.status(403).json({ error: 'Acceso denegado, alumno no autorizado' });
    }

    console.log('ID del alumno autenticado:', req.alumnoId);

    try {
        const cursosConProgreso = await Alumno.findAll({
            where: { id: req.alumnoId },
            include: [
                {
                    model: Curso,
                    as: 'cursos',
                    attributes: ['id', 'titulo', 'descripcion', 'duracionTotal'],
                    through: {
                        model: AlumnoCursos,
                        attributes: ['progreso'],
                    },
                },
            ],
        });

        console.log('Cursos obtenidos:', cursosConProgreso);

        if (!cursosConProgreso || cursosConProgreso.length === 0) {
            console.log('Error: No se encontraron cursos para este alumno');
            return res.status(404).json({ error: 'No se encontraron cursos para este alumno' });
        }

        const resultado = cursosConProgreso[0].cursos.map((curso) => ({
            cursoId: curso.id,
            titulo: curso.titulo,
            descripcion: curso.descripcion,
            duracionTotal: curso.duracionTotal,
            progreso: curso.AlumnoCursos.progreso,
        }));

        console.log('Cursos formateados para la respuesta:', resultado);
        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener los cursos del alumno:', error);
        res.status(500).json({ error: 'Error al obtener los cursos del alumno' });
    }
};



// // Obtener los cursos asignados a un alumno (con el progreso)
// export const obtenerCursosPorAlumnoId = async (req, res) => {
//     const { alumnoId } = req.params; // Obtener el ID del alumno desde los parámetros de la URL

//     try {
//         // Consultar los cursos de un alumno y su progreso
//         const cursosConProgreso = await Alumno.findAll({
//             where: { id: alumnoId }, // Filtrar por el alumnoId
//             include: [
//                 {
//                     model: Curso, // Incluir el modelo Curso a través de la tabla intermedia AlumnoCursos
//                     as: 'cursos',  // Alias usado en la relación belongsToMany
//                     attributes: ['id', 'titulo', 'descripcion', 'duracionTotal'], // Selecciona los campos que desees del curso
//                     through: {
//                         model: AlumnoCursos,
//                         attributes: ['progreso'], // Incluir el progreso del alumno en este curso desde la tabla intermedia
//                     },
//                 },
//             ],
//         });

//         if (!cursosConProgreso || cursosConProgreso.length === 0) {
//             return res.status(404).json({ error: 'No se encontraron cursos para este alumno' });
//         }

//         // Formatear la respuesta
//         const resultado = cursosConProgreso[0].cursos.map((curso) => ({
//             cursoId: curso.id,
//             titulo: curso.titulo,
//             descripcion: curso.descripcion,
//             duracionTotal: curso.duracionTotal,
//             progreso: curso.AlumnoCursos.progreso, // Obtener el progreso desde la tabla intermedia AlumnoCursos
//         }));

//         res.json(resultado); // Retorna los cursos con su progreso
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al obtener los cursos del alumno' });
//     }
// };
