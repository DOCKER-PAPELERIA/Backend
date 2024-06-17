import { Router } from "express";
import { crearProveedor, 
        eliminarProveedor, 
        listarProveedor, 
        modificarProveedor, 
        mostrarProveedor } from "../controllers/controllers.proveedor";
import { verifyToken } from "../middleware/oauth";


const rutaProveedor = Router();

rutaProveedor.get("/proveedor/:id", mostrarProveedor);
rutaProveedor.get("/proveedor", listarProveedor);
rutaProveedor.post("/proveedor", verifyToken, crearProveedor);
rutaProveedor.put("/proveedor", verifyToken, modificarProveedor);
rutaProveedor.delete("/proveedor", verifyToken, eliminarProveedor);



export default rutaProveedor;