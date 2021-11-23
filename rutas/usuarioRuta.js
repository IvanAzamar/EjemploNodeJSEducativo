'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl');

var api = express.Router();

api.get('/probando-control', usuarioControl.prueba);
api.post('/registrar', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);


module.exports = api;