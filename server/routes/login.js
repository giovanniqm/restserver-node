// =================================
//    Librerías y Carga de Archivos
// ==================================

// # - Para cargar información del usuario
const Usuario = require('../models/usuario');

// # - Libreria Bcrypt => Para encriptar contraseñas
// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

// # - Libreria Express => Propiedades (app.get, app.post... etc)
const express = require('express');
const app = express();

// # - Libreria JsonWebToken => Para generar Token
// https: //www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');


app.post('/login', (req, res) => {

    // Variable para guardar email + password que el usuario escribio
    let body = req.body;

    // findOne: Metodo que permite buscar y regresar solo un elemento
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        // Si se dispara algún error ó excepción en la BD
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        // Verificar que NO viene un usuario de DB, es decir el email NO existe
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        // Verificar que la contraseña hace match o sea valida
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (Contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    })
});

module.exports = app;