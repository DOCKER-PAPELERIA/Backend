import { Router } from "express";
import {Agotado, Precios, 
        crearProducto, 
        eliminarProducto, 
        listarProducto, 
        modificarProducto, 
        mostrarProducto,} from "../controllers/controllers.producto";
import { verifyToken } from "../middleware/oauth";

const rutaProducto = Router();

rutaProducto.get("/producto/:id", mostrarProducto);
rutaProducto.get("/producto", listarProducto);
rutaProducto.get("/producto-agotado", Agotado);
rutaProducto.get("/producto-precio", Precios);
rutaProducto.post("/producto", verifyToken, crearProducto);
rutaProducto.put("/producto", verifyToken, modificarProducto);
rutaProducto.delete("/producto", verifyToken, eliminarProducto);


export default rutaProducto;