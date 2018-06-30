var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Comentarios = mongoose.model('Comentarios');
var Subastas = mongoose.model('Subastas');

//GET - Listar comentarios
router.get('/comentarios', function(req, res, next){
    Comentarios.find(function(err, comentarios){
        if(err){return next(err)}
        
        res.json(comentarios)
    })
})

//POST - Agregar comentarios
router.post('/comentario', function(req, res, next){
    var comentario = new Comentarios(req.body);
    console.log(req.body);
    comentario.save(function(err, comentario){
        if(err){ return next(err)}
            res.json(comentario);
    })
})

//PUT - Actualizar comentarios
router.put('/comentario/:id', function(req, res){
    Comentarios.findById(req.params.id, function(err, comentario){
        comentario.precio_comentario         = req.body.precio;
        comentario.fecha_comentario     = req.body.fecha_comentario;
        
        comentario.save(function(err){
            if(err){res.send(err)}
            res.json(comentario);
        })
    })
})

//DELETE - Eliminar comentarios
router.delete('/comentario/:id', function(req, res){
    Comentarios.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La comentario se ha eliminado'});
    })
})

module.exports = router;