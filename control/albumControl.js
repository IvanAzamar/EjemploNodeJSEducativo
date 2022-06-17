var fs = require('fs');
var path = require('path');
var mongoosePagina = require('mongoose-pagination');

var artModelo = require('../modelo/artistas');
var Album = require('../modelo/album');
var Cancion = require('../modelo/cancion');

function getAlbum(req, res) {
    res.status(200).send({ message: 'Accion getAlbum' });
}

module.exports = {
    getAlbum
}