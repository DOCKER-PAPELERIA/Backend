/**
 * este es las rutas de categorias 
 * @module ctr-index-rutas-principales
 */
import { Router } from "express";
import { messageBrowse } from "../messages/browser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../tools/swagger-output.json";
import rutaCategoria from "./categoria.router";
import rutaProducto from "./producto.router";
import rutaProveedor from "./proveedor.roter";
import rutaUsuario from "./usuarios.routers";
import rutaFactura from "./factura.router";

/**
 * Esta es la ruta de mi proyecto
 * @type {object}
 */

const ruta = Router();

// Rutas para los diferentes recursos de la API
ruta.use("/api", rutaCategoria); // Rutas relacionadas con categorías bajo /api/categoria
ruta.use("/api", rutaProducto); // Rutas relacionadas con productos bajo /api/producto
ruta.use("/api", rutaProveedor); // Rutas relacionadas con proveedores bajo /api/proveedor 
ruta.use("/api", rutaFactura); // Rutas relacionadas con facturas bajo /api/factura
 
// Rutas adicionales
ruta.use("/user", rutaUsuario);// Rutas relacionadas con usuarios bajo /user

// Ruta para la documentación de Swagger
ruta.use("/doc",  swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Ruta para acceder a la documentación de Swagger

// Ruta de inicio
ruta.use("/", (req, res) => {res.json({"respuesta":messageBrowse.principal})}); // Respuesta principal cuando se accede a la raíz "/"


export default ruta;