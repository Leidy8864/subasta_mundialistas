var mongoose = require('mongoose');
var User     = mongoose.model('User');

var SubastasSchema = new mongoose.Schema({
    precio_inicial  : Number,
    fecha_inicio    : {type: Date, default: Date.now},
    fecha_fin       : Date,
    categoria       : String,
    titulo          : String,
    descripcion     : String,
    image           : String,
    estado          : String,
    usuario_id      : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

mongoose.model('Subastas', SubastasSchema);
