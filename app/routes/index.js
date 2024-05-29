import { Router } from "express";
import rutaCategoria from "./categoria.router";
import rutaProducto from "./producto.router";
import rutaProveedor from "./proveedor.roter";

const ruta = Router();

ruta.use("/categoria", rutaCategoria);
ruta.use("/producto", rutaProducto);
ruta.use("/proveedor", rutaProveedor);


export default ruta;