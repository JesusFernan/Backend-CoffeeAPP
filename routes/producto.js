const express = require('express');
const app = express();
const Producto = require('../models/producto');


/* 
===========================================
Peticion "GET" obtener todos los productos
===========================================
*/
app.get('/', (req, res) => {
    Producto.find({}).exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al cargar productos",
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            productos: productos
        });
    });
});

/* 
===========================================
Peticion "POST" crear un nuevo producto
===========================================
*/
app.post('/', (req, res) => {
    const body = req.body;

    const producto = new Producto({
        nombreProducto: body.nombreProducto,
        img: body.img,
        descripcion: body.descripcion,
        size: body.size,
        precio: body.precio
    });

    producto.save((err, productoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un nuevo producto.',
                errors: err
            });
        }

        return res.status(201).json({
            ok: true,
            mensaje: "Producto Guardado Exitosamente",
            procucto: productoGuardado
        });
    });

});

/* 
===========================================
Peticion "PUT" Actualizar producto
===========================================
*/
app.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar producto.',
                errors: err
            });
        }
        if (!producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto con el ID' + id + 'No existe',
                errors: {
                    message: 'No existe el usuario con ese ID'
                }
            });
        }
        producto.nombreProducto = body.nombreProducto;
        producto.img = body.img;
        producto.descripcion = body.descripcion;
        producto.size = body.size;
        producto.precio = body.precio;

        producto.save((err, productoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar producto',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje:'Producto Actualizado Correactamente.',
                producto: productoGuardado
            });
        });
    });
});
/* 
===========================================
Peticion "DELETE" Eliminar producto
===========================================
*/
app.delete('/:id',(req,res) =>{
    const id= req.params.id;
    Producto.findByIdAndDelete(id, (err, productoEliminado) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Producto',
                erros: err
            });
        }
        if(!productoEliminado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un producto con el id'+id 
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Producto Eliminado Exitosamente',
            producto: productoEliminado
        });
    });
});








module.exports = app;