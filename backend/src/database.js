/*
* En este archivo realizamos la conexión a una base de datos en MongoDB
* Es importante recordar que no es necesario crear la base de datos desde MongoDBCompass, ya que si no existe, se crea automaticamente
*
* Usamos variables de entorno con dotenv y comprobamos si la conexión está open, disconnected o error
*
* TODO: cuando la conexión esté desconectada o genere un error, hacer una función para reconectarme automaticamente a la base de datos
*/
import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config.js";

// Importamos dotenv para cargar las variables de entorno
dotenv.config();
// Conexión a la base de datos
const dbURI = config.db.URI;

// Conexión a la base de datos
mongoose.connect(URI)


//EN ESTA Cosntante guardamos la conexión a la base de datos, que tiene los valores

const db = mongoose.connection;

//Evneto que aparece cuando se coenncte a la base de datos
connection.once("connected", () => {
    console.log("Conectado a la base de datos");
});

//Evento que aparece cuando se desconecta a la base de datos
connection.on("disconnected", () => {
    console.log("Desconectado de la base de datos");
});

//Evento que aparece cuando hay un error en la conexión a la base de datos  
connection.on("error", (error) => {
    console.log("Error en la conexión a la base de datos", error);
});


