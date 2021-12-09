'use strict'

var artModelo = require('../modelo/artistas');
var art = new artModelo();
var fs = require('fs');
var path = require('path');
const { param } = require('../rutas/usuarioRuta');

function getArtista(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });
}

function registarArtista(req, res) {
    var artista = new artModelo();
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
            console.log(registroAlmacenado);
        }
    });
}

module.exports = {
    getArtista,
    registarArtista
};