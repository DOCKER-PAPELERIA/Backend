import { Router } from "express";
import { crearFactura, 
        eliminarFactura, 
        listarFactura,
        modificarFactura, 
        mostrarFactura } from "../controllers/controllers.factura";



const rutaFactura = Router();

rutaFactura.get("/factura/:id", mostrarFactura);
rutaFactura.get("/factura", listarFactura);
rutaFactura.post("/factura", crearFactura);
rutaFactura.put("/factura", modificarFactura);
rutaFactura.delete("/factura", eliminarFactura);



export default rutaFactura;