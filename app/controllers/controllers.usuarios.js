/**
 * Este es el controlador de usuario
 * @module crt-usuario
 */

import pool from "../config/mysql.db";
import bcrypt, { hash } from "bcrypt";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";

config();


/**
 * Muestra un usuario específico basado en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const mostrarUsuario = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_USUARIO("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};

/**
 * Lista todos los usuarios disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const listarUsuario = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_USUARIO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


/**
 * Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud y manda mensaje al correo del usuairo y la contraseña.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idRol - Rol del usuario.
 * @param {string} req.body.identificacion - Identificación del usuario.
 * @param {string} req.body.nombres - Nombres del usuario.
 * @param {string} req.body.telefono - Teléfono del usuario.
 * @param {string} req.body.fecha_naci - Fecha de nacimiento del usuario.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.estado - Estado del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
const crearUsuario = async (req, res) => {
    const { idRol, identificacion, nombres, telefono, fecha_naci, correo, estado } = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {
        
        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena = hash;

        
        const respuesta = await pool.query(`CALL SP_INSERTAR_USUARIO("${idRol}", "${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}", "${correo}", "${contrasena}", "${estado}");`);
        
        if (respuesta[0].affectedRows == 1) {
            // Crear el mensaje de correo
            let msg = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            line-height: 1.6;
                            padding: 20px;
                        }
                        .container {
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            max-width: 600px;
                            margin: auto;
                        }
                        h1 {
                            color: #808080;
                        }
                        p {
                            font-size: 2em;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>¡Bienvenido, ${nombres}!</h1>
                        <p>¡Te hemos asignado un usuario y una contraseña para que ingreses a la página!</p>
                        <p><strong>Tu usuario es:</strong> ${correo}</p>
                        <p><strong>Tu contraseña es:</strong> ${contrasenasincifrar}</p>
                        <p>¡Te esperamos!</p>
                    </div>
                </body>
                </html>
            `;
            
            
            await sendEmail(msg, correo, "Creación de la cuenta");

            
            success(req, res, 201, "Usuario creado correctamente y correo enviado");
        } else {
            error(req, res, 400, "No se pudo crear el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Modifica un usuario existente con los datos proporcionados en el cuerpo de la solicitud y mnada el correo de los cambios de su usuario nuevo y contraseña.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.identificacion - Identificación del usuario.
 * @param {string} req.body.nombres - Nombres del usuario.
 * @param {string} req.body.telefono - Teléfono del usuario.
 * @param {string} req.body.fecha_naci - Fecha de nacimiento del usuario.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.estado - Estado del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
const modificarUsuario = async (req, res) => {
    const {identificacion, nombres, telefono, fecha_naci, correo, estado} = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {

        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena= hash;

        const respuesta = await pool.query(`CALL SP_EDITAR_USUARIO("${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}", "${correo}", "${contrasena}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            let msg = `
                <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              line-height: 1.6;
              padding: 20px;
          }
          .container {
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
              max-width: 600px;
              margin: auto;
          }
          h1 {
              color: #808080;
          }
          p {
              font-size: 2em;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>¡Hola, ${nombres}!</h1>
          <p>¡Queremos informarte que tu información ha sido actualizada!</p>
          <p><strong>Tu nuevo usuario es:</strong> ${correo}</p>
          <p><strong>Tu nueva contraseña es:</strong> ${contrasenasincifrar}</p>
          <p>¡Gracias por tu atención!</p>
      </div>
  </body>
  </html>
            `;
            sendEmail(msg, correo, "Modificacion de la cuenta");
            success(req, res, 201, "Usuario modificado correctamente");
        } else {
            error(req, res, 400, "No se pudo modificado el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

/**
 * Elimina un usuario específico basado en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario a eliminar.
 */
const eliminarUsuario = async (req, res) => {
    const {idUsuario} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_USUARIO("${idUsuario}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Usuario Eliminado");
        } else {
            error(req, res, 400, "Usuario NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Autentica un usuario basado en las credenciales proporcionadas para loguear al usuario.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_BUSCAR_LOGIN('${correo}');`);
        if (respuesta[0][0]== 0) {
            error(req, res, 404, "Usuario no existe.");
            return;
        }
        const match = await bcrypt.compare(contrasena, respuesta[0][0][0].contrasena);
        if (!match){
            error(req, res, 401, "Contraseña incorrecta");
            return;
        }
        let payload = {
            "correo": correo
        }
        let token = await jwt.sign(
            payload,
            process.env.TOKEN_PRIVATEKEY,
            {
                expiresIn : process.env.TOKEN_EXPIRES_IN
            }); 
        success(req, res, 200,token);
        
    } catch (e) {
        console.error("Error en el servidor:", e);
        error(req, res, 500, "error en el servidor, porfavor intente nuevamente");
    }
};

/**
 * Envía  correos electrónico.
 * @function
 * @async
 * @param {string} messages - Contenido del mensaje.
 * @param {string} receiverEmail - Correo electrónico del receptor.
 * @param {string} subject - Asunto del correo.
 * @throws Will throw an error if the email sending fails.
 */
const sendEmail = async (messages, receiverEmail, subject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.EMAIL_CORREO,
                pass: process.env.EMAIL_CLAVE
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL_CORREO,
            to: receiverEmail,
            subject: subject,
            html: messages
        });

        console.log("Email enviado:", info.messageId);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw error;
    }
};

/**
 * Cambia la contraseña del usuario y envía un correo con la nueva contraseña cuando el usuario recupere la cuenta.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 */
const cambiarContrasenaYEnviarCorreo = async (req, res) => {
    const { correo } = req.body;
    try {
        
        const [usuario] = await pool.query(`SELECT * FROM usuario WHERE correo = ?`, [correo]);
        if (!usuario.length) {
            return error(req,res, 400, "el correo proporcionado no existe");
        }

        // Generar una nueva contraseña aleatoria
        function generateRandomPassword(length = 12) {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        }

        const nuevaContrasena = generateRandomPassword(); 

        
        const hash = await bcrypt.hash(nuevaContrasena, 2); 
        const contrasenaEncriptada = hash;

        const [respuesta] = await pool.query(`UPDATE usuario SET contrasena = ? WHERE correo = ?`, [contrasenaEncriptada, correo]);

        if (respuesta.affectedRows === 1) {
            // Crear el mensaje de correo
            const msg = ` 
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        /* Estilos CSS para el correo */
                        /* ... (tus estilos aquí) ... */
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>¡Hola, ${usuario[0].nombres}!</h1>
                        <p>¡Queremos informarte que tu contraseña ha sido actualizada!</p>
                        <p><strong>Tu nueva contraseña es:</strong> ${nuevaContrasena}</p>
                        <p>¡Gracias por tu atención!</p>
                    </div>
                </body>
                </html>
            `;

            await sendEmail(msg, correo, "Modificación de la contraseña");

            return success(req,res,200,"Contraseña modificada correctamente y correo enviado");
        } else {
            return error(req, res, 400, "No se pudo modificar la contraseña");
        }
    } catch (err) {
        console.error('Error:', err);
        return error(req,res,400, err);
    }
};


/**
 * Muestra la información del usuario basada en el token proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.user.correo - Correo electrónico del usuario.
 */
const mostrarUsuariobaseToken = async (req, res) => {
    const { correo } = req.user;

    try {
        const sql = 'SELECT * FROM usuario WHERE correo = ?';
        const [resultado] = await pool.query(sql, [correo]);

        if (resultado.length === 0) {
            return error(req, res,404, "usuario no encontrado");
        }

        const usuario = resultado[0];
        success(req,res, 200,usuario);
    } catch (error) {
        console.error(error);

        error(req,res,500, 'Error del servidor al obtener el perfil del usuario');
    }
};




export { listarUsuario, mostrarUsuario, crearUsuario, modificarUsuario, eliminarUsuario, loginUsuario, sendEmail, cambiarContrasenaYEnviarCorreo, mostrarUsuariobaseToken};
