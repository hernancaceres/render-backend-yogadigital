# Yoga Digital - Backend

Este es el backend del proyecto Yoga Digital, una plataforma diseñada para gestionar alumnos, cursos, clases y posturas de yoga. El backend está construido con Node.js, Express y Sequelize, utilizando una base de datos PostgreSQL y JWT para la autenticación.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas Principales](#rutas-principales)
- [Uso](#uso)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Requisitos

- Node.js v14 o superior
- PostgreSQL
- Sequelize CLI para la migración de la base de datos
- npm o yarn

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd yoga-digital-backend

Instala las dependencias:

npm install

Configura las variables de entorno en el archivo .env (ver sección Configuración).

Ejecuta las migraciones de la base de datos:

npx sequelize db:migrate

npx sequelize db:migrate

Inicia el servidor:

npm start

Configuración
Crea un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=3000
DATABASE_URL=postgres://<usuario>:<contraseña>@<host>:<puerto>/<nombre_base_datos>
JWT_SECRET=<clave_secreta_jwt>


PORT: Puerto en el que el servidor escucha las peticiones.
DATABASE_URL: URL de conexión de la base de datos PostgreSQL.
JWT_SECRET: Clave secreta para la generación de tokens JWT.
Estructura del Proyecto

backend/
├── src/
│   ├── controllers/       # Controladores para manejar la lógica de negocio
│   ├── middleware/        # Middlewares de autenticación y validación
│   ├── models/            # Modelos de Sequelize para la base de datos
│   ├── routes/            # Rutas de la API
│   ├── config/            # Configuración de la base de datos y entorno
│   └── app.js             # Configuración y levantamiento de la aplicación
├── .env                   # Variables de entorno (no debe incluirse en el control de versiones)
├── .gitignore
├── package.json
└── README.md

Rutas Principales
/api/admin: Rutas para la gestión de administradores (registro, login, perfil).
/api/alumnos: Rutas para la gestión de alumnos (registro, login, perfil).
/api/cursos: Rutas para la gestión de cursos y acceso a sus clases y posturas.
/api/clases: Rutas para manejar las clases dentro de los cursos.
/api/posturas: Rutas para la gestión de posturas de yoga.
Ejemplos de Rutas
Registro de Alumno: POST /api/alumnos/registrar
Inicio de sesión de Admin: POST /api/admin/login
Obtener todas las clases de un curso: GET /api/cursos/:cursoId/clases
Obtener detalles de una postura: GET /api/posturas/:id
Uso
Registro de Alumno

curl -X POST http://localhost:3000/api/alumnos/registrar -H "Content-Type: application/json" -d '{
    "nombre": "Nombre del Alumno",
    "email": "email@ejemplo.com",
    "password": "contraseña123"
}'

Inicio de Sesión de Admin

curl -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d '{
    "email": "admin@ejemplo.com",
    "password": "contraseña123"
}'

Obtener Perfil del Alumno Autenticado

curl -X GET http://localhost:3000/api/alumnos/perfil/:id -H "Authorization: Bearer <token>"


Tecnologías Utilizadas
Node.js: Entorno de ejecución para el servidor.
Express: Framework para la creación de la API REST.
Sequelize: ORM para manejar la base de datos PostgreSQL.
bcryptjs: Librería para el hash de contraseñas.
jsonwebtoken: Para la autenticación basada en JWT.
express-validator: Para la validación de datos en las rutas de la API.
Contribución
Si deseas contribuir a este proyecto:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m "Agregar nueva funcionalidad").
Sube tus cambios (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

¡Gracias por contribuir a Yoga Digital!



