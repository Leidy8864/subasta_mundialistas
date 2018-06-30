var mongoose = require('mongoose');

var ComentariosSchema = new mongoose.Schema({
    texto       : String,
    valoracion  : Number,
    fecha_publicacion  : {type: Date, default: Date.now},
    usuario_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    subasta_id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subastas'
    }
});

mongoose.model('Comentarios', ComentariosSchema);