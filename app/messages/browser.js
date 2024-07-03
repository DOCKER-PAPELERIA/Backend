/**
 * Este es mesajes de manejo de errores
 * @module crt-mensajes-manejo-erores
 */
export const messageBrowse = {
    principal: "Bienvenido",
    home: "Hola home",
    gallery: "Hola gallery",
    about: "Hola about",
    contact: "Hola contact"
};

/**
 * Responde con un mensaje de éxito y un cuerpo de respuesta opcional.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {number} [status=200] - Código de estado HTTP (por defecto 200).
 * @param {*} [body] - Cuerpo de respuesta opcional.
 * @param {string} [message] - Mensaje adicional opcional.
 */
export const success = (req, res, status=200, body ,message = null) => {
    const response = { error: false, status ,body };
    if (message) response.message = message;
    res.status(status).json(response);
};


/**
 * Responde con un mensaje de error y un objeto de error.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {number} [status=500] - Código de estado HTTP (por defecto 500).
 * @param {Error|string} err - Objeto de error o mensaje de error.
 */
export const error = (req, res, status=500, err) => {
    res.status(status).json({ error: true, status, error: err.message || err });
};









// export const success = (req, res, status=200, mensaje = null) => {
//     res.status(status).json({
//         error: false,
//         status:status,
//         body:mensaje
//     })
// };

// export const error = (req, res, status=500, mensaje="")  => {
//     res.status(status).json({
//         error: true,
//         status:status,
//         body:mensaje
//     })
// };

