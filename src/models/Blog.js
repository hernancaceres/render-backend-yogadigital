import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Blog = sequelize.define(
    'Blog',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Blog;