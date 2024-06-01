import { Router } from "express";
import { crearCuenta, 
        eliminarCuenta, 
        listarCuenta, 
        modificarCuenta, 
        mostrarCuenta } from "../controllers/controllers.crearcuenta";


const rutaCuenta = Router();

rutaCuenta.get("/mostrarCuenta/:id", mostrarCuenta);
rutaCuenta.get("/listarCuenta", listarCuenta);
rutaCuenta.post("/crearCuenta", crearCuenta);
rutaCuenta.put("/modificarCuenta", modificarCuenta);
rutaCuenta.delete("/eliminarCuenta", eliminarCuenta);




export default rutaCuenta;