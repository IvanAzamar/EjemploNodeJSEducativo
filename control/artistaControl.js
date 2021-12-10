'use strict'

var artModelo = require('../modelo/artistas');
var art = new artModelo();
var fs = require('fs');
var path = require('path');
const { param } = require('../rutas/usuarioRuta');
var artista = new artModelo();
var mongoosePagina = require('mongoose-pagination');

function getArtista(req, res) {
    var artistaId = req.params.id;
    artModelo.findById(artistaId, (err, artistaBD) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else if (!artistaBD) {
            res.status(404).send({ message: 'El artista no existe' });
        } else if (artistaBD) {
            res.status(200).send({ artista: artistaBD });
        }
    });
}

function getArtistas(req, res) {
    if (req.params.page) {
        var page = req.params.pages;
    } else {
        var page = 1;
    }
    var itemPaginas = 3;
    artModelo.find().sort('nombre').paginate(page, itemPaginas, function(err, artistas, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!artistas) {
                res.status(404).send({ message: 'El artista no existe' });
            } else {
                return res.status(200).send({
                    pages: total,
                    artistas: artistas
                });
            }

        }

    });
}

function registarArtista(req, res) {
    var params = req.body;
    artista.nombre = params.nombre;
    artista.descripcion = params.descripcion;
    artista.imagen = "";

    artista.save((error, registroAlmacenado) => {
        if (error) {
            res.status(500).send({ message: 'Error al guardar el artista' });
        } else if (!registarArtista) {
            res.status(404).send({ message: 'Ingresaste algun dato equivocado' });
        } else if (registarArtista) {
            res.status(200).send({ artista: registroAlmacenado });
        }
    });
}


module.exports = {
    getArtista,
    getArtistas,
    registarArtista
};