
export const PORT = 4000

export const config = {
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'crecimiento espiritual 2022',
      name: process.env.DB_NAME || 'yogadigital1db',
    },
    jwtSecret: process.env.JWT_SECRET || 'secreto',
    port: process.env.PORT || 4000,
  };
  