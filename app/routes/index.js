import { Router } from "express";
import rutaCategoria from "./categoria.router";
import rutaProducto from "./producto.router";
import rutaProveedor from "./proveedor.roter";
import rutaUsuario from "./usuarios.routers";
import rutaCuenta from "./crearcuenta.router";
import rutaRegproducto from "./regproducto.router";

const ruta = Router();

ruta.use("/categoria", rutaCategoria);
ruta.use("/producto", rutaProducto);
ruta.use("/proveedor", rutaProveedor);
ruta.use("/usuario", rutaUsuario);
ruta.use("/cuenta", rutaCuenta);
ruta.use("/regproducto", rutaRegproducto);


export default ruta;