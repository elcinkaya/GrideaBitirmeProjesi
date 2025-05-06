const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

exports.getAllPosts = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      let userPosts = [];
      let otherPosts = [];
  
      if (req.session.user) {
        const userId = req.session.user.id;
  
        const [userResults] = await connection.execute(
          'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
          [userId]
        );
        userPosts = userResults;
  
        const [otherResults] = await connection.execute(
          'SELECT * FROM posts WHERE user_id != ? ORDER BY created_at DESC',
          [userId]
        );
        otherPosts = otherResults;
      } else {
        const [allResults] = await connection.execute(
          'SELECT * FROM posts ORDER BY created_at DESC'
        );
        otherPosts = allResults;
      }
  
      await connection.end();
  
      const allPosts = [...userPosts, ...otherPosts];
  
      res.json(allPosts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Yazılar alınırken hata oluştu.');
    }
};

exports.addPost = async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const { title, content, category } = req.body;
    
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        'INSERT INTO posts (user_id, title, content, category) VALUES (?, ?, ?, ?)', 
        [req.session.user.id, title, content, category]
      );
      await connection.end();
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Yazı eklenemedi.');
    }
};

exports.deletePost = async (req, res) => {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }
    const postId = req.params.id;
    
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        'DELETE FROM posts WHERE id = ? AND user_id = ?', 
        [postId, req.session.user.id]
      );
      await connection.end();
      res.status(200).send('Yazı silindi');
    } catch (err) {
      console.error(err);
      res.status(500).send('Silme işlemi sırasında hata oluştu.');
    }
};
exports.getUserPosts = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [req.session.user.id]
    );
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kullanıcı gönderileri alınamadı.');
  }
};

