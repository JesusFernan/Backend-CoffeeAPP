const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;


/* 
===========================================
Verificar TOKEN
===========================================
*/

exports.verificaToken = function (req, res, next) {
    const token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({ // 401 not Unauthorized (must be authenticated)
                ok: false,
                mensaje: 'Token incorrecto.',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
        
        /*res.status(200).json({ // 401 not Unauthorized (must be authenticated)
            ok: true,
            mensaje: 'Token incorrecto.',
            decoded: decoded
           
        });*/
    }); 
}