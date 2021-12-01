'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/usuario' });



api.get('/probando-control', md_auth.validarAcceso, usuarioControl.prueba);
api.post('/registrar', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, usuarioControl.actualizarUsuario);
api.post('/actualizar-imagen-usuario/:id', [md_auth.validarAcceso, dir_fotos], usuarioControl.actualizarFoto);
api.get('/get-imagen-usuario/:imageFile', usuarioControl.getFoto);

module.exports = api;