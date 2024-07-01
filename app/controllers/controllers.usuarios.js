import pool from "../config/mysql.db";
import bcrypt, { hash } from "bcrypt";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
config();


// ------------------------------METODO DE MOSTRAR UN SOLO USUARIO------------------------------------------------
const mostrarUsuario = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_USUARIO("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


// ------------------------------METODO DE MOSTRAR TODOS USUARIO----------------------------------------------------
const listarUsuario = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_USUARIO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


// ------------------------------METODO DE CREAR USUARIO-------------------------------------------------------------
const crearUsuario = async (req, res) => {
    const { idRol, identificacion, nombres, telefono, fecha_naci, correo, estado } = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {
        // Encriptar la contraseña
        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena = hash;

        // Insertar el nuevo usuario en la base de datos
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
            
            // Enviar el correo de bienvenida
            await sendEmail(msg, correo, "Creación de la cuenta");

            // Responder al cliente
            success(req, res, 201, "Usuario creado correctamente y correo enviado");
        } else {
            error(req, res, 400, "No se pudo crear el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};



// ------------------------------METODO DE MODIFICAR USUARIO------------------------------------------------------------
const modificarUsuario = async (req, res) => {
    const {idUsuario, identificacion, nombres, telefono, fecha_naci, correo, estado} = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {
        
        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena= hash;
        
        const respuesta = await pool.query(`CALL SP_EDITAR_USUARIO("${idUsuario}", "${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}", "${correo}", "${contrasena}", "${estado}");`);
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


// ------------------------------METODO DE ELIMINAR USUARIO----------------------------------------------------------
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


// ------------------------------METODO DE LOGUAR USUARIO------------------------------------------------------------
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

// ------------------------------ESTE METODO ES PARA MANDAR CORREO AL MOMENTO DE CRAR UN USUARIO------------------------------------------------------------

const sendEmail = async (messages, receiverEmail, subject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: true, // Usa secure: true para SSL y secure: false para TLS
            auth: {
                user: process.env.EMAIL_CORREO,
                pass: process.env.EMAIL_CLAVE
            },
            tls: {
                rejectUnauthorized: false // Ignora errores de certificado autofirmado
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
        throw error; // Re-lanzar el error para manejarlo donde sea que se invoque sendEmail
    }
};

export { listarUsuario, mostrarUsuario, crearUsuario, modificarUsuario, eliminarUsuario, loginUsuario, sendEmail };
