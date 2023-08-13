const express = require('express');
require('dotenv').config();
const { dbConection } = require('./db/config');
const cors = require('cors');

//Crear el sevidor de express
const app = express();


//Base de datos, connection to MongoAtlas
dbConection();


//CORS configuration
app.use(cors());



// Directorio Publico
app.use( express.static('public') );

// //? Puede haber problemas de archivos estaticos, por eso se debe servir de manera explicita

// app.get('/', (req, res) => {
//   // La ruta principal ahora servirá el archivo "index.html" de la carpeta "public"
//   res.sendFile(__dirname + '/public/index.html');
// });

//Lectura y parseo del body
app.use( express.json() );

//* las peticiones que vengan en formato json se van a procesar en este midelware y se va extraer 
//* su contenido


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD: Eventos




//Escuchar peticiones
app.listen( process.env.PORT, () =>{
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});








//all procesos que estan corriendo en el entorno no solo el de la .env si no todos
// console.log(process.env); 



//? use
//* use en express es conocido como un midelware, noe s mas que una funcion que se ejecuta en el momento
//* en que alguien hace una peticion al servidor.

//? Routes Midellware 
//* () primero es la ruta en donde quiero que este habilitado este endpoint que se va crear, y luego se hace
//* el require de lo que tenemos en auth, decimos que todo lo que el require va exportar, lo va ahbilitat
//* en la ruta /api/auth (del archivo de la carpeta routes archivo auth.js)