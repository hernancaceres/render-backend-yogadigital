import express from 'express';
import { PORT } from './config.js';
import alumnoRoutes from  './routes/alumno.routes.js';
import morgan from 'morgan';
import sequelize from './database/database.js';
import cors from 'cors';

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de la petición como JSON
app.use(express.json());

// Middleware para parsear datos de formularios en caso de que lo necesites
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"))

// Tus rutas
app.use('/api/alumnos', alumnoRoutes);

app.listen(PORT, () => {
  console.log(`SERVER corriendo en: http://localhost:${PORT}`);
});

// Sincronizar la base de datos 
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
}).catch((err) => {
  console.error('Error al conectar la base de datos:', err);
});

