const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //Tipo de colección
    const tiposValidos = ['usuarios', 'productos'];
    if (tiposValidos.indexOf(tipo) < 0 ){
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es valida!',
            errors: {mesage: 'Tipo de colección no es valida!'}
        });
    }
    const imagen = req.files; // cargamos archivos

    if (!imagen) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccionó nada!',
            errors: {
                mesage: 'Debe de seleccionar una imagen.'
            }
        });
    }

    const archivo = req.files.imagen; //Obtener nombre del archivo
    const nombreCortado = archivo.name.split('.'); //Nombre del archivo separado por puntos 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; //Obtenemos la extension del archivo

    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']; //Extensiones que solo podemos recibir

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida!',
            erros: {message: 'Las unicas extensiones válidas son: ' + extensionesValidas.join(', ')}
        });
    }
    /*Nombre de la imagen personalizada
      Este nombre se genera con el id de usuario, seguido de un - y por ultimo los milisegundos de la fecha actual
      Ejemplo  12312312312-123.png
      Esto para que no pueda haber otro nombre igual y no truene al momento de subir*/

    
    //Mover el archivo a un PATH
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;


    // Mover el archivo del temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }
       res.status(200).json({
            ok: true,
            mensaje: 'Archivo movido correctamente!',
             
        });
     })

});



module.exports = app;