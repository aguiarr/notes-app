const connection = require('./infrastructure/connection');

class Notes {
    
    add(note, res){

        const sql = 'INSERT INTO notes SET ?';

        connection.query(sql, note, (erro, result) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(note);
            }
        });
    }

    find(res){

        const sql = 'SELECT * FROM notes ORDER BY id DESC';

        connection.query(sql, (erro, result) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(result);
            }
        });
    }

    findBy(id, res){
        const sql = `SELECT * FROM notes WHERE id=${id}`;

        connection.query(sql, (erro,result) => {
            const note = result[0];
            
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(note);
            }
        });
    }

    edit(id, values,res){

        const sql = 'UPDATE notes SET ? WHERE id=?';

        connection.query(sql, [values,id], (erro, result) => {

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...values, id});
            }
        });
    }

    delete(id, res){

        const sql = 'DELETE FROM notes WHERE id=?';

        connection.query(sql, id, (erro, result) => {

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        });
    }
    
}
module.exports = new Notes;