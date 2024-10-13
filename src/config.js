
export const PORT = 4000
export const JWT_SECRET = 'secreto'

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
  



// // clever

// export const PORT = 4000

// export const config = {
//     database: {
//       host: process.env.DB_HOST || 'bii7ftlmdmzoupqdxt0d-mysql.services.clever-cloud.com',
//       user: process.env.DB_USER || 'ulj4zrmapwn4yupf',
//       password: process.env.DB_PASSWORD || 'PhabNtR5Gfa4d912vRQZ',
//       name: process.env.DB_NAME || 'bii7ftlmdmzoupqdxt0d',
//     },
//     jwtSecret: process.env.JWT_SECRET || 'secreto',
//     port: process.env.PORT || 4000,
//   };
  