// db.js
const mysql = require('mysql2');
const config = require('./config/dbConfig'); // config.js içindeki ayarları alıyoruz

const connection = mysql.createConnection(config);

connection.connect(err => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err);
    } else {
        console.log('Veritabanına başarıyla bağlanıldı.');
    }
});

module.exports = connection;
