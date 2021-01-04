
class Tables{
    init(connection){
        this.connection = connection;
        this.createTables();
    }
    createTables(){

        const sql = 'CREATE TABLE IF NOT EXISTS notes ( id INT NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, note TEXT NOT NULL, PRIMARY KEY(id));';
        
        this.connection.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }else{
                console.log('Table created successful!');
            }
        });
    }
    
}
module.exports = new Tables;