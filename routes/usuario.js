const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const mdAutenticacion = require('../midlewares/autenticacion');

/* 
===========================================
Peticion "GET" obtener todos los usuarios
===========================================
*/
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario..',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            });
});


/* 
===========================================
Peticion "POST" Crear un nuevo Usuario
===========================================
*/
app.post('/',  mdAutenticacion.verificaToken, (req, res) => {

    const body = req.body;

    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });
    });


});
/* 
===========================================
Peticion "PUT" Actualizar Usuario
===========================================
*/
app.put('/:id',  mdAutenticacion.verificaToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + 'no existe',
                errors: {
                    message: 'No existe el usuario con ese ID'
                }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

/* 
===========================================
Peticion "DELETE" Eliminar Usuario
===========================================
*/

app.delete('/:id',mdAutenticacion.verificaToken, (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID',
                errors: {
                    message: 'No existe un usuario con ese ID '
                }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });
    });
});














module.exports = app;