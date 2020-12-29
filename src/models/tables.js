
class Tables{
    init(connection){
        this.connection = connection;
        this.createTables();
    }
    createTables(){

        const sql = 'CREATE TABLE IF NOT EXISTS * ( id INT NOT NULL, PRIMARY KEY(id));';
        
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