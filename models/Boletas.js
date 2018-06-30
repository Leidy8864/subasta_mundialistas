var mongoose = require('mongoose');

var BoletasSchema = new mongoose.Schema({
    u_vendedor_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    u_comprador_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    subasta_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subastas'
    },
    puja_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pujas'
    }
});

mongoose.model('Boletas', BoletasSchema);
