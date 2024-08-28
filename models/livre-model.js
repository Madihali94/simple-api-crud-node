const mongoose = require('mongoose');

const LivreSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            require: true
        },
        auteur: {
            type: String,
            require: true
        },
        edition: {
            type: String,
            require: true
        },
        nbrePages: {
            type: Number,
            require: true
        },
    
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Livre", LivreSchema);
