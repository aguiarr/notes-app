const connection = require('../infrastructure/connection');

class Notes {
    
    add(note, res){

        const sql = 'INSERT INTO notes (title, note) VALUES (?,?)';
        const params = [note.title, note.note];

        connection.run(sql, params, (erro, result) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(note);
            }
        });
    }

    find(res){

        const sql = 'SELECT * FROM notes ORDER BY id DESC';

        connection.all(sql, (erro, result) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(result);
            }
        });
    }

    findBy(id, res){
        const sql = `SELECT * FROM notes WHERE id=?`;
        connection.get(sql, id, (erro,result) => {
            
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(result);
            }
        });
    }

    edit(id, values,res){

        const sql = 'UPDATE notes SET title = COALESCE(?, title),note = COALESCE(?, note) WHERE id=?';
        const params = [values.title, values.note, id];
        connection.run(sql, params, (erro, result) => {

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...values});
            }
        });
    }

    delete(id, res){

        const sql = 'DELETE FROM notes WHERE id=?';

        connection.run(sql, id, (erro, result) => {

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        });
    }
    
}
module.exports = new Notes;