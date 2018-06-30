var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Boletas = mongoose.model('Boletas');
var Subastas = mongoose.model('Subastas');

//GET - Listar boletas
router.get('/boletas', function(req, res, next){
    Boletas.find(function(err, boletas){
        if(err){return next(err)}
        res.json(boletas)
    })
})

//POST - Agregar boletas
router.post('/boleta', function(req, res, next){
    var boleta = new Boletas(req.body);
    console.log(req.body);
    boleta.save(function(err, boleta){
        if(err){ return next(err)}
            res.json(boleta);
    })
})

//PUT - Actualizar boletas
router.put('/boleta/:id', function(req, res){
    Boletas.findById(req.params.id, function(err, boleta){
        boleta.precio_boleta         = req.body.precio;
        boleta.fecha_boleta     = req.body.fecha_boleta;
        
        boleta.save(function(err){
            if(err){res.send(err)}
            res.json(boleta);
        })
    })
})

//DELETE - Eliminar boletas
router.delete('/boleta/:id', function(req, res){
    Boletas.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La boleta se ha eliminado'});
    })
})

module.exports = router;