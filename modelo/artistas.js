'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaArtistas = Schema({
    nombre: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('Artistas', EsquemaArtistas);