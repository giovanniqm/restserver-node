const jwt = require('jsonwebtoken');

// =====================
//    Verificar Token
// =====================

// # Usamos tres parametros para la verificación
// # request, response y el netx que se encargá de continuar la ejecución del programa
let verificaToken = (req, res, next) => {

    // Para leer un header personalizado desde POSTMAN
    // En este caso, de la petición GET
    let token = req.get('token');

    // Para verificar si el token es valido 
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        // Si algo sale mal...
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido o expirado'
                }
            });
        }

        // Pasar a cualquier dato del usuario, luego de verificado el token
        req.usuario = decoded.usuario;

        next(); // Si no llamamos esta función, simplemente el programa no continúa la ejecución

    });
};

// ========================
//   Verificar AdminRole
// ========================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no tiene un rol administrador'
            }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdmin_Role

}