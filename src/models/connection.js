const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'hostname',
    port: 'port number',
    user: 'user',
    password: 'password',
    database: 'database'
});

module.exports = connection;