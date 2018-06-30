var mongoose = require('mongoose');
var Subastas = mongoose.model('Subastas');

var PujasSchema = new mongoose.Schema({
    precio_puja      : Number,
    fecha_puja  : {type: Date, default: Date.now},
    usuario_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    subasta_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subastas'
    }
});

mongoose.model('Pujas', PujasSchema);
