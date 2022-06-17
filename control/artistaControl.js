'use strict'

var artModelo = require('../modelo/artistas');
var Album = require('../modelo/album');
var Cancion = require('../modelo/cancion');

var fs = require('fs');
var path = require('path');
const { param } = require('../rutas/usuarioRuta');
var artista = new artModelo();
var mongoosePagina = require('mongoose-pagination');

function insertArtista(req, res) {
    var datosArtista = req.body; //POST
    artista.nombre = datosArtista.nombre;
    artista.descripcion = datosArtista.descripcion
    artista.imagen = "";

    artista.save((error, artistaBD) => {
        if (error) {
            res.status(500).send({ mensaje: 'Error en el almacenamiento del Artista' });
        } else {
            if (!artista) {
                res.status(404).send({ mensaje: 'No se puedo almacenar el artista verifica datos' });
            } else {
                res.status(200).send({
                    artista: artistaBD,
                    mensaje: 'Artista registado'
                });
            }
        }
    });
}

function getArtista(req, res) {
    var artistaId = req.params.id; //GET o URL
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
    var itemPaginas = 10;
    artModelo
        .find()
        .sort('nombre')
        .paginate(page, itemPaginas, function(err, artistas, total) {
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

function actualizarArtista(req, res) {
    var artistaId = req.params.id;
    var datos = req.body;
    artModelo.findByIdAndUpdate(artistaId, datos, (err, artistaActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guradar el artista' });
        } else {
            if (!artistaActualizado) {
                res.status(404).send({ message: 'El artista no ha sido actualizado' });
            } else {
                res.status(200).send({ artista: artistaActualizado });
            }
        }
    });
}

function borrarArtista(req, res) {
    var artistaId = req.params.id;
    artModelo.findByIdAndRemove(artistaId, (error, artistaRemovido) => {
        if (error) {
            res.status(500).send({ mensaje: 'Error en el servidor' });
        } else {
            res.status(200).send({
                artista: artistaRemovido,
                mensaje: 'Artista removido'
            });
        }
    });
}

//     artModelo.findByIdAndRemove(artistaId, (err, artistaRemovido) => {
//         if (err) {
//             res.status(500).send({ message: 'Error al eliminar un artista' });
//         } else {
//             if (!artistaRemovido) {
//                 res.status(404).send({ message: 'El artista no ha sido removido' });
//             } else {
//                 res.status(200).send({ artistaRemovido });
//                 //album

//                 Album.find({ artista: artistaRemovido._id }).remove((err, albumRemovido) => {
//                     if (err) {
//                         res.status(500).send({ message: 'Error al borrar el album' });
//                     } else {
//                         if (!albumRemovido) {
//                             res.status(404).send({ message: 'El album no se ha removido' });
//                         } else {
//                             //Canciones
//                             Cancion.find({ album: albumRemovido._id }).remove((err, cancionesRemovido) => {
//                                 if (err) {
//                                     res.status(500).send({ message: 'Error al borrar el canciones' });
//                                 } else {
//                                     if (!cancionesRemovido) {
//                                         res.status(404).send({ message: 'las Canciones no se ha removido' });
//                                     } else {
//                                         res.status(200).send({ artista: artistaRemovido });
//                                     }
//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         }
//     });
// }

module.exports = {
    getArtista,
    getArtistas,
    actualizarArtista,
    borrarArtista,
    registarArtista,
    insertArtista
};