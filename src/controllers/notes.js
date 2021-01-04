const Notes = require('../models/notes');

module.exports = app => {
    app.get('/notes', (req, res) => {

        Notes.find(res);
    });
    
    app.get('/notes/:id', (req, res) =>{
        const id = parseInt(req.params.id);

        Notes.findBy(id, res);
    });

    app.post('/notes', (req, res) => {
        const note = req.body;

        Notes.add(note, res);
    });

    app.patch('/notes/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        Notes.edit(id, values, res);
    });

    app.delete('/notes/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Notes.delete(id, res);
    });
}