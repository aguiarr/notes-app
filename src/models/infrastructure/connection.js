const sqlite = require('sqlite3').verbose();

const connection = new sqlite.Database('./src/models/infrastructure/database/database.db', (erro) => {
    if(erro){
        return console.error(erro.message);
    }
    console.log("conectado");
});

module.exports = connection;