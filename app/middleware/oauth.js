/**
 * Este es sistema de funciones y servicios middleware
 * @module crt-Middleware
 */
import  jwt from "jsonwebtoken";
import { config } from "dotenv";
import { error, success } from "../messages/browser";
config();

/**
 * Middleware para verificar y decodificar un token JWT.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de middleware para pasar el control al siguiente middleware.
 * @returns {void}
 */
export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    console.log('Token recibido:', token);

    if (!token) {
        console.log('Acceso denegado: Token no proporcionado');
        return success(req, res, 401, 'Acceso denegado.');
    }

    try {
        const valida = await jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        req.user = valida;
        console.log('Usuario autenticado:', req.user);
        next();
    } catch (e) {
        console.error('Error al verificar token:', e);
        error(req, res, 401, 'Falta Acceso del token.');
    }
};