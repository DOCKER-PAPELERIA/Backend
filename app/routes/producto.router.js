import { Router } from "express";
import { Nuevo, Precios, Viejo, agotado, 
        crearProducto, 
        eliminarProducto, 
        listarProducto, 
        masCostoso, 
        menosCostoso, 
        modificarProducto, 
        mostrarProducto, 
        ordenAlfabetico} from "../controllers/controllers.producto";
import { verifyToken } from "../middleware/oauth";

const rutaProducto = Router();

rutaProducto.get("/producto/:id", mostrarProducto);
rutaProducto.get("/producto", listarProducto);
rutaProducto.get("/agotado", agotado);
rutaProducto.get("/producto-ordenar", ordenAlfabetico);
rutaProducto.get("/producto-nuevo", Nuevo);
rutaProducto.get("/producto-viejo", Viejo);
rutaProducto.get("/producto-maxcostoso", masCostoso);
rutaProducto.get("/producto-mincostoso", menosCostoso);
rutaProducto.get("/producto-precio", Precios);
rutaProducto.post("/producto", verifyToken, crearProducto);
rutaProducto.put("/producto", verifyToken, modificarProducto);
rutaProducto.delete("/producto", verifyToken, eliminarProducto);


export default rutaProducto;