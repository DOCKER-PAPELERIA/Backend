import colors from "colors";


export const msjConsole = (tipo, mensaje) =>{
    switch (tipo) {
        case "puertoSuccess": 
        console.log(mensaje.bgGreen);
        break;
        case "puertoError":
            console.log(mensaje.bgRed);
            default:
                break;
    }
}

export const mensa = {
    puerto: "Ejecutamdose en el puerto:"
}
