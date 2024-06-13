import { Router } from "express";
import { crearCuenta, 
        eliminarCuenta, 
        listarCuenta, 
        modificarCuenta, 
        mostrarCuenta } from "../controllers/controllers.crearcuenta";


const rutaCuenta = Router();

rutaCuenta.get("/cuenta/:id", mostrarCuenta);
rutaCuenta.get("/cuenta", listarCuenta);
rutaCuenta.post("/cuenta", crearCuenta);
rutaCuenta.put("/cuenta", modificarCuenta);
rutaCuenta.delete("/cuenta", eliminarCuenta);




export default rutaCuenta;