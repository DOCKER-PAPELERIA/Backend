/**
 * Este es el archivo ejecuta el puerto
 * @module crt-puerto
 */
import app from "./app.js";
import {msjConsole, mensa} from "./messages/consola.js";

/**
 * Escucha el puerto definido en la configuración de la aplicación y muestra un mensaje de éxito en la consola.
 * @param {number} app.get("port") - Puerto configurado en la aplicación Express.
 * @param {string} mensa.puerto - Mensaje base que indica que el servidor está ejecutándose en un puerto.
 * @param {string} app.get("port") - Puerto específico en el que está escuchando el servidor.
 */
app.listen(app.get("port"), () => {
    msjConsole("puertoSuccess",
        `${mensa.puerto} ${app.get("port")} http://localhost:${app.get("port")}`);
});