'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

api.get('/probando-control', md_auth.validarAcceso, usuarioControl.prueba);
api.post('/registrar', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, usuarioControl.actualizarUsuario);

module.exports = api;