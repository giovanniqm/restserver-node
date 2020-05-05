// # - Este archivo contiene la configuración y carga de todas las rutas

// =================================
//    Librerías y Carga de Archivos
// ==================================

// # - Librería Express 
// https://www.npmjs.com/package/express 
const express = require('express');
const app = express();

app.use(require('./usuario')); // Ruta para usuario
app.use(require('./login')); // Ruta para login

module.exports = app;