import Blog from '../models/Blog.js';

// Obtener una entrada de blog por ID
export const obtenerBlogPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Entrada de blog no encontrada' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error al obtener la entrada de blog:', error);
        res.status(500).json({ error: 'Error al obtener la entrada de blog' });
    }
};

// Crear una nueva entrada de blog
export const crearBlog = async (req, res) => {
    const { titulo, descripcion, imagenUrl } = req.body;
    try {
        console.log('Datos recibidos para crear blog:', { titulo, descripcion, imagenUrl });

        const nuevoBlog = await Blog.create({ titulo, descripcion, imagenUrl });

        console.log('Blog creado exitosamente:', nuevoBlog);
        res.json(nuevoBlog);
    } catch (error) {
        console.error('Error al crear el blog:', error);
        res.status(500).json({ error: 'Error al crear el blog', detalles: error.message });
    }
};

// Actualizar una entrada de blog
export const actualizarBlog = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagenUrl } = req.body;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Entrada de blog no encontrada' });
        }

        blog.titulo = titulo;
        blog.descripcion = descripcion;
        blog.imagenUrl = imagenUrl;

        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error('Error al actualizar la entrada de blog:', error);
        res.status(500).json({ error: 'Error al actualizar la entrada de blog' });
    }
};

// Eliminar una entrada de blog
export const eliminarBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Entrada de blog no encontrada' });
        }
        await blog.destroy();
        res.json({ message: 'Entrada de blog eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la entrada de blog:', error);
        res.status(500).json({ error: 'Error al eliminar la entrada de blog' });
    }
};

// Obtener todas las entradas de blog
export const obtenerBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        console.error('Error al obtener las entradas de blog:', error);
        res.status(500).json({ error: 'Error al obtener las entradas de blog' });
    }
};
