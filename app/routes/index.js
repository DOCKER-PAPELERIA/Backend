import { Router } from "express";
import { messageBrowse } from "../messages/browser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../tools/swagger-output.json";
import rutaCategoria from "./categoria.router";
import rutaProducto from "./producto.router";
import rutaProveedor from "./proveedor.roter";
import rutaUsuario from "./usuarios.routers";
import rutaCuenta from "./crearcuenta.router";
import rutaRegproducto from "./regproducto.router";

const ruta = Router();

ruta.use("/", (req, res) => {res.json({"respuesta":messageBrowse.principal})});
ruta.use("/api", rutaCategoria);
ruta.use("/api", rutaProducto);
ruta.use("/api", rutaProveedor);
ruta.use("/api", rutaCuenta);
ruta.use("/api", rutaRegproducto);
ruta.use("/user", rutaUsuario);
ruta.use("/doc",  swaggerUi.serve, swaggerUi.setup(swaggerFile));


export default ruta;