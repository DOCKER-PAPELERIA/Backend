import { Router } from "express";
import { crearFactura, 
        eliminarFactura, 
        listarFactura,
        mostrarFactura } from "../controllers/controllers.factura";
import { verifyToken } from "../middleware/oauth";



const rutaFactura = Router();

rutaFactura.get("/factura/:id", mostrarFactura);
rutaFactura.get("/factura", listarFactura);
rutaFactura.post("/factura", verifyToken, crearFactura);
rutaFactura.delete("/factura", verifyToken, eliminarFactura);



export default rutaFactura;