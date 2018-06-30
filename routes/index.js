var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'uploads/'});
var fs = require('fs');

var mongoose = require('mongoose');
var Subastas = mongoose.model('Subastas');

//GET - Listar subastas
router.get('/subastas', function(req, res, next){
    Subastas.find(function(err, subastas){
        if(err){return next(err)}
        res.json(subastas)
    })
})

//POST - Agregar subasta
/**router.post('/subasta', function(req, res, next){
    var subasta = new Subastas(req.body);
    
    subasta.save(function(err, subasta){
        if(err){ return next(err)}
            res.json(subasta);
    })
})**/

//POST - Agregar subasta
router.post('/subasta', upload.any(), function(req, res, next){
    if(req.files){
        req.files.forEach( function(file){
            var filename = (new Date).valueOf()+"-"+file.originalname
            fs.rename(file.path, 'public/images/pro/'+filename, function(err){
                if(err)throw err;
   
                //subirlo a mongoose
                var subasta = new Subastas({
                    precio_inicial   : req.body.precio_inicial,
                    usuario_id       : req.body.usuario_id,
                    fecha_inicio     : req.body.fecha_inicio,
                    fecha_fin        : req.body.fecha_fin,
                    categoria        : req.body.categoria,
                    titulo           : req.body.titulo,
                    descripcion      : req.body.descripcion,
                    estado           : req.body.estado,
                    image            : filename
                });
   
                subasta.save(function(err, subasta){
                    if(err){ return next(err)}
                        res.json(subasta);
                });               
                console.log("archivo subido");
            });            
        });
    }
})

//PUT - Actualizar subasta
router.put('/subasta/:id', function(req, res){
    Subastas.findById(req.params.id, function(err, subasta){
        subasta.precio_inicial   = req.body.precio_inicial;
        subasta.fecha_inicio     = req.body.fecha_inicio;
        subasta.fecha_fin        = req.body.fecha_fin;
        subasta.categoria        = req.body.categoria;
        subasta.titulo           = req.body.titulo;
        subasta.descripcion      = req.body.descripcion;
        subasta.estado           = req.body.estado;
        subasta.image            = req.body.file;
        
        subasta.save(function(err){
            if(err){res.send(err)}
            res.json(subasta);
        })
    })
})

//DELETE - Eliminar subasta
router.delete('/subasta/:id', function(req, res){
    Subastas.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La subasta se ha eliminado'});
    })
})

module.exports = router;
