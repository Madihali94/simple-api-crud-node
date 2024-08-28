const express = require('express');
const morgan = require('morgan');
const connectBD = require('./bd/bd');
const Livres = require('./models/livre-model');

const port = 3000;
const app = express();

app.use(express.json())
    .use(morgan('dev'));

// Connexion avec la base de données mongoDb
connectBD();

// Endpoint pour l'ajout d'un livre
app.post('/api/livre/ajout', (req, res) => {
    const newLivre = new Livres({...req.body});
    newLivre.save()
    .then(() => {  
        const message = `Le livre ${newLivre.titre} est bien enregistré`;
        res.json({message: message, newLivre});
    })
    .catch(err => console.log(err));
})

// Recuperation des informations d'un livre
app.get('/api/livre/:id', async (req, res) => {
    try{
        const idLivre = req.params.id;
        const livre = await Livres.findById(idLivre);
        if (!livre) {
            res.send("Le livre est introuvable !");
        }
        const message = "Livre trouvé";
        res.json({message: message, livre});
    }catch(e) {
        res.json({message: e.message});
    }
});

// modification des informations d'un livre
app.put('/api/livre/:id', async (req, res) => {
    try{    
        const idLivre = req.params.id;
        const livre = await Livres.findByIdAndUpdate(idLivre, req.body);
        const message = "Livre modifier";
        res.json({message, livre});
    }catch(e) {
        res.json({message: e.message});
    }
});

// Suppression d'un livre 
app.delete('/api/livre/:id', async (req, res) => {
    try {
        const idLivre = req.params.id;
        const livre = await Livres.findByIdAndDelete(idLivre);
        const message = "Livre supprimer";
        res.json({message, livre});
    }catch(e) {
        res.json({message: e.message});
    }
});

app.listen(port, () => console.log(`Le serveur est bien demarré dans le port ${port}`));
