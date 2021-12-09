'use strict'
var express = require('express');
var artControl = require('../control/artistaControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/usuario' });


api.get('/getArtista', md_auth.validarAcceso, artControl.getArtista);
api.post('/registarArtista', md_auth.validarAcceso, artControl.registarArtista);

module.exports = api;