'use strict'
var express = require('express');
var artControl = require('../control/artistaControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/artista' });

api.post('/insertarArtista', artControl.insertArtista);


api.get('/getArtista/:id', md_auth.validarAcceso, artControl.getArtista);
api.post('/registarArtista', md_auth.validarAcceso, artControl.registarArtista);
api.get('/getArtistas/:page?', md_auth.validarAcceso, artControl.getArtistas);
api.put('/actualizarArtista/:id', md_auth.validarAcceso, artControl.actualizarArtista);
api.delete('/borrarArtista/:id', md_auth.validarAcceso, artControl.borrarArtista);

module.exports = api;