var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Pujas = mongoose.model('Pujas');
var Subastas = mongoose.model('Subastas');

//GET - Listar pujas
router.get('/pujas', function(req, res, next){
    Pujas.find(function(err, pujas){
        if(err){return next(err)}
        
        res.json(pujas)
    })
})

//POST - Agregar pujas
router.post('/puja', function(req, res, next){
    var puja = new Pujas(req.body);
    console.log(req.body);
    puja.save(function(err, puja){
        if(err){ return next(err)}
            res.json(puja);
    })
})

//PUT - Actualizar pujas
router.put('/puja/:id', function(req, res){
    Pujas.findById(req.params.id, function(err, puja){
        puja.precio_puja    = req.body.precio;
        puja.fecha_puja     = req.body.fecha_puja;
        
        puja.save(function(err){
            if(err){res.send(err)}
            res.json(puja);
        })
    })
})

//DELETE - Eliminar pujas
router.delete('/puja/:id', function(req, res){
    Pujas.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La puja se ha eliminado'});
    })
})

module.exports = router;