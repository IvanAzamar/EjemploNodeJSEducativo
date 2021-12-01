'use strict'

var jwt = require('jwt-simple');
var momento = require('moment');
var claveSecretaInterna = 'clave_secreta_interna';

exports.validarAcceso = function(req, res, next) {

    if (!req.headers.autorizacion) {
        return res.status(404).send({ message: 'La petición del usuario no tiene datos de autorización' });
    }
    var token = req.headers.autorizacion.replace(/['"]+/g, '');
    //    replace elimina las comillas dobles y simples de la peticion el modificador g es para toda la cadena
    try {
        var payload = jwt.decode(token, claveSecretaInterna);

        if (payload.exp <= momento().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' });
        }
    } catch (error) {
        return res.status(404).send({ message: 'Token no válido' });
    }
    req.user = payload;
    next();
}