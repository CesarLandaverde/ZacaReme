/*
* En este archivo realizamos la conexión a una base de datos en MongoDB
* Es importante recordar que no es necesario crear la base de datos desde MongoDBCompass, ya que si no existe, se crea automaticamente
*
* Usamos variables de entorno con dotenv y comprobamos si la conexión está open, disconnected o error
*
* TODO: cuando la conexión esté desconectada o genere un error, hacer una función para reconectarme automaticamente a la base de datos
*/
import mongoose from "mongoose";
import { config } from "./config.js";

const dbURI = config.db.URI;

// Opcional: para depuración, elimina después de probar
console.log("dbURI:", dbURI);

// Conexión a la base de datos (sin opciones obsoletas)
mongoose.connect(dbURI);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Conectado a la base de datos");
});

connection.on("disconnected", () => {
    console.log("Desconectado de la base de datos");
});

connection.on("error", (error) => {
    console.log("Error en la conexión a la base de datos", error);
});

export default connection;


