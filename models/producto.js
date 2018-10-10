const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const sizePermitido = {
    values:['CHICO','MEDIANO','GRANDE'],
    message:'{VALUE} no es un tamaño permitido, solo se permiten CHICO,MEDIANO,GRANDE'
};
const seccion = {
    values:['CAFE','COMIDA','BEBIDA'],
    message:'{VALUE} no es una sección permitida, solo puedes utilizar CAFE,COMIDA,BEBIDA'
};

const productoSchema = new Schema({
    nombreProducto: {type: String, required:[true,'El nombre del producto es necesario.']},
    img:{type: String, required:[true,'La imagen del producto es necesaria.']},
    seccion:{type: String, required: true, enum: seccion},
    descripcion: {type: String, required:[true,'La descripcion de producto es necesaria.']},
    size:{type: String, required: true, default: 'MEDIANO', enum: sizePermitido},
    precio:{type: Number, required:[true,'El precio del producto es necesario.']}
});
productoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único. '});


module.exports = mongoose.model('Producto', productoSchema);