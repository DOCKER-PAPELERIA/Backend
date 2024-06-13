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

export const success = (req, res, status=200, body ,message = null) => {
    const response = { error: false, status ,body };
    if (message) response.message = message;
    res.status(status).json(response);
};

export const error = (req, res, status=500, err) => {
    res.status(status).json({ error: true, status, error: err.message || err });
};
