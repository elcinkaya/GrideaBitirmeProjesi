const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Elcin..98',
    database: 'mydb3'
});

module.exports = connection;

const dbConfig = require('./dbConfig');

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Bağlantı hatası:', err);
    } else {
      console.log('Başarıyla bağlandık');
      connection.release();  // Bağlantıyı serbest bırak
   } });
