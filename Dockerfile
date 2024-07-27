# Usa una imagen base oficial de Node.js
FROM node:21

# Establece el directorio de trabajo en el contenedor
WORKDIR /dist

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Exponer el puerto en el que la aplicación correrá
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]