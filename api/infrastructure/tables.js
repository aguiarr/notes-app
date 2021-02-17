
class Tables{
    init(connection){
        this.connection = connection;
        this.createNotes();
    }
    createNotes(){

        const sql = 'CREATE TABLE IF NOT EXISTS notes ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, note TEXT NOT NULL)';
        
        this.connection.run(sql, (erro) => {
            if(erro){
                console.log(erro);
            }
        });
    }
    
}
module.exports = new Tables;