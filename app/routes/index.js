import { Router } from "express";
import rutaCategoria from "./categoria.router";
import rutaProducto from "./producto.router";
import rutaProveedor from "./proveedor.roter";
import rutaUsuario from "./usuarios.routers";
import rutaCuenta from "./crearcuenta.router";
import rutaRegproducto from "./regproducto.router";

const ruta = Router();

ruta.use("/api", rutaCategoria);
ruta.use("/api", rutaProducto);
ruta.use("/api", rutaProveedor);
ruta.use("/api", rutaCuenta);
ruta.use("/api", rutaRegproducto);
ruta.use("/user", rutaUsuario);


export default ruta;