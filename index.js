const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();

//Body Parser 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar Rutas
const loginRoutes = require('./routes/login');
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const productoRoutes = require('./routes/producto');
const busquedaRoutes = require('./routes/busqueda');
const uploadRoutes = require('./routes/upload');


// Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/CoffeeApp', { useNewUrlParser: true }, (err,res) =>{
    mongoose.set('createIndexes', true);
    if( err ) throw err;
    
        const colorOnline = '\x1b[32m%s\x1b[0m'
        console.log(`Base de datos : ${colorOnline}`,'online');
});


 
// Rutas
app.use('/upload', uploadRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/producto',productoRoutes);
app.use('/usuario', usuarioRoutes); 
app.use('/login', loginRoutes);
app.use('/', appRoutes); 
 

 

// Servidor corriendo
const port = process.env.PORT || 5000
app.listen(port, () =>  {
    const colorOnline = '\x1b[32m%s\x1b[0m'
    console.log(`Express server puerto: ${port} : ${colorOnline}`,'online');
  
});

