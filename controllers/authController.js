const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dbConfig = require('../config/dbConfig');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute (
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username, hashedPassword]
        );
        await connection.end();
        res.redirect('/login');
    } catch (err) {
        res.send('Kayıt başarısız. Kullanıcı adı alınmış olabilir.');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?', 
        [username]
      );
      await connection.end();
      
      if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
        return res.send('Giriş başarısız.');
      }
      
      req.session.user = rows[0];
      res.redirect('/dashboard');
    } catch (err) {
      res.send('Hata oluştu.');
    }
};
  
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
};
  