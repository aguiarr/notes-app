
const configExpress = require('./config/express')
const connection = require('./models/infrastructure/connection')
const Tables = require('./models/infrastructure/tables')


connection.connect( erro => {

    if(erro){
        console.log(erro);
  
    }else{
        console.log('connetion');
  
        Tables.init(connection);
        const aplication = configExpress();
        aplication.listen(3000, () => console.log('Server on port 3000'));
    }
  });