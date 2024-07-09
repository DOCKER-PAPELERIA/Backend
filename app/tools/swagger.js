import swaggerAutogen from "swagger-autogen";
import { config } from "dotenv";
config();

/**
 * Puerto en el que la aplicación va a estar escuchando.
 * @type {number}
 */
let port = process.env.PORT || 3000;

const doc = {
    info: {
        title: 'API DE SEGURIDAD', 
        description: 'API DE SEGURIDAD'
    },
    host: "https://ms-inventario-api-mi-angel-1.onrender.com" + '/api',
};

const outputFile = './swagger-output.json';

/**
 * Rutas de los archivos que contienen las definiciones de rutas para Swagger.
 * @type {string[]}
 */
const routes = [
    '../routes/categoria.router.js',
    '../routes/historial.router.js',
    '../routes/producto.router.js',
    '../routes/proveedor.roter.js',
    '../routes/usuarios.routers.js'
    
];

swaggerAutogen()(outputFile, routes, doc);