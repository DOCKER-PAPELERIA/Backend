import swaggerAutogen from "swagger-autogen";
import { config } from "dotenv";
config();

let port = process.env.PORT || 3000;

const doc = {
    info: {
        title: 'API DE SEGURIDAD', 
        description: 'API DE SEGURIDAD'
    },
    host: 'localhost:' + port + '/api',
};

const outputFile = './swagger-output.json';
const routes = [
    '../routes/categoria.router.js',
    '../routes/factura.router.js',
    '../routes/producto.router.js',
    '../routes/proveedor.roter.js',
    '../routes/usuarios.routers.js'
    
];

swaggerAutogen()(outputFile, routes, doc);