const express = require('express');
const bcrypy = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const app = express();
const Usuario = require('../models/usuario');


app.post('/', (req, res) => {

    const body = req.body;
    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario.',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }
        if (!bcrypy.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }
        //Crear un Token!!!
        usuarioDB.password = ':)';
        const token = jwt.sign({ usuario: usuarioDB}, SEED , {
            expiresIn: 14400
        }) //Expiracion de TOKEN: 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });


});


module.exports = app;