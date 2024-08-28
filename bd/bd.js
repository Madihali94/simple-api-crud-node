const { connect } = require('http2');
const mongoose = require('mongoose');

const connectBD = () => {
    mongoose.connect("mongodb://localhost:27017/examenBd")
        .then(() => console.log("La connexion avec la base de donnée a reussi"))
        .catch((error) => console.error("Echec de la connexion ", error));
}

module.exports = connectBD;
