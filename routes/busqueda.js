const express = require('express');
const app = express();
const Producto = require('../models/producto');

/* 
===========================================
Peticion "GET" Buscar todo por el query "URL"
===========================================
*/
app.get('/todo/:busqueda', (req, res, next) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    buscarProductos( busqueda, regex)
        .then( productos =>{
            res.status(200).json({
                ok: true,
                productos: productos
            });
        });
});

function buscarProductos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Producto.find({nombreProducto:regex}, (err, productos) => { 
            err ? reject('Error al cargar productos') : resolve(productos) //if (ternario) Es6
        });
    });
}

/* 
===========================================
Peticion "GET" Busqueda por coleccion (tablas) "URL"
===========================================
*/

app.get('/coleccion/:tabla/:busqueda', (req, res)=>{
    const  busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');

    var promesa;

    switch( tabla ){
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
        break;
        
        case 'productos':
            promesa = buscarProductos(busqueda, regex);
        break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo  son: usuarios y productos',
                error: { message: 'Tipo de tabla/coleccion no válido'}
            });

    }
    promesa.then( data =>{
        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});





module.exports = app;