import pool from "../config/mysql.db";
import { success, error } from "../messages/browser.js";
import { config } from "dotenv";
import nodemailer from "nodemailer";
config();


// ------------------------------METODO DE MOSTRAR UN SOLO PRODUCTO------------------------------------------------
const mostrarProducto = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRODUCTOS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE MOSTRAR PRODUCTO AGOTADO------------------------------------------------
const Agotado = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_PRODUCTO_AGOTADO();`);
        if (respuesta.length === 0 || (respuesta[0] && respuesta[0].length === 0)) {
            success(req, res, 200, "No hay productos agotados.");
        } else {
            // Enviar correo de alerta
            const emailText = respuesta[0].map(producto => `Producto: ${producto.nombre_product}, Stock: ${producto.stock}`).join('\n');
            const emailSubject = "Alerta: Productos Agotados";
            const emailRecipient = "papeleria.angel.info@gmail.com"; // Cambia esto al correo deseado

            await sendMail(emailRecipient, emailSubject, emailText);
            success(req, res, 200, respuesta[0], "Productos Agotados y correo enviado.");
        }
    } catch (err) {
        error(req, res, 500, err);
    }
};



// ------------------------------METODO DE MOSTRAR TODO LOS PRODUCTOS-------------------------------------
const listarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_PRODUCTOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE MOSTRAR EL PRODUCTO Y SU PRECIO---------------------------------
const Precios = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRECIOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE CREAR LOS PRODUCTOS----------------------------------------------------
const crearProducto = async (req, res) => {
    const {idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL  SP_INSERTAR_PRODUCTOS("${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto creado correctamente.");
        } else {
            error(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE MODIFICAR LOS PRODUCTOS------------------------------------------------
const modificarProducto = async (req, res) => {
    const {idProducto, idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_PRODUCTO("${idProducto}", "${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto  modificado correctamete.");
        } else {
            error(req, res, 401, "Producto No se modifico, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE ELIMINAR LOS PRODUCTOS-------------------------------------------------
const eliminarProducto = async (req, res) => {
    const {idProducto} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_PRODUCTO("${idProducto}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Producto Eliminado");
        } else {
            error(req, res, 400, "Producto NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_CORREO,
        pass: process.env.EMAIL_CLAVE
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_CORREO,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

export { listarProducto, mostrarProducto, Precios, Agotado, crearProducto, modificarProducto, eliminarProducto };