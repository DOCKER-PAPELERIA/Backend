import { Router } from "express";
import { crearProveedor, 
        eliminarProveedor, 
        listarProveedor, 
        modificarProveedor, 
        mostrarProveedor } from "../controllers/controllers.proveedor";


const rutaProveedor = Router();

rutaProveedor.get("/mostrarProveedor/:id", mostrarProveedor);
rutaProveedor.get("/listarProveedor", listarProveedor);
rutaProveedor.post("/crearProveedor", crearProveedor);
rutaProveedor.put("/modificarProveedor", modificarProveedor);
rutaProveedor.delete("/eliminarProveedor", eliminarProveedor);



export default rutaProveedor;