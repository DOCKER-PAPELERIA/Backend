import  jwt from "jsonwebtoken";
import { config } from "dotenv";
import { error, success } from "../messages/browser";
config();

export const verifyToken = async (req , res, next) => {

    const token = req.headers["x-access-token"];

    if(!token){
        return success(req, res, 401, "Acceso denegado.");
    }
    try {
        const valida = await jwt.verify(
            token, process.env.TOKEN_PRIVATEKEY
        );
        next();
       } catch (e) {
        error(req, res, 401, "Falta Acceso del token.")
       }
};