const { isAuthenticated } = require('../middlewares/authMiddleware');


const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const db = require('../db'); // db.js dosyasını çağırıyoruz



router.get('/api/posts', postController.getAllPosts);
router.get('/api/user-posts', postController.getUserPosts);
router.post('/add-post', postController.addPost);
router.delete('/api/posts/:id', postController.deletePost);

// Yeni gönderi formu
router.get('/posts/new', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('new');
  });
  
  // Gönderi oluştur
  router.post('/posts', isAuthenticated, (req, res) => {
    const { title, category, content } = req.body;
    const user_id = req.session.user.id;

    const sql = 'INSERT INTO posts (title, category, content, user_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, category, content, user_id], (err, result) => {
        if (err) {
            console.error('Gönderi eklenirken hata oluştu:', err);
            return res.status(500).send('Bir hata oluştu, gönderi eklenemedi.');
        }
        res.redirect('/');
    });
  });

  
  // Gönderi detay
  router.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
      SELECT posts.*, users.username FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.id = ?
    `;
    db.query(sql, [id], (err, results) => {
      if (err || results.length === 0) return res.send('Gönderi bulunamadı');
      const post = results[0];
      const isOwner = req.session.user && post.user_id === req.session.user.id;
      res.render('detail', { post, isOwner });
    });
  });
  
  // Gönderi sil
  router.post('/posts/:id/delete', (req, res) => {
    const id = req.params.id;
    const userId = req.session.user?.id;
    const sql = 'DELETE FROM posts WHERE id = ? AND user_id = ?';
    db.query(sql, [id, userId], (err) => {
      if (err) return res.send('Silme hatası');
      res.redirect('/');
    });
  });
  
  // Gönderi düzenleme formu
  router.get('/posts/:id/edit', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err || results.length === 0) return res.send('Bulunamadı');
      const post = results[0];
      if (post.user_id !== req.session.user?.id) return res.send('Yetkisiz erişim');
      res.render('edit', { post });
    });
  });
  
  // Güncelleme işlemi
  router.post('/posts/:id', (req, res) => {
    const { title, content, category } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?';
    db.query(sql, [title, content, category, id], (err) => {
      if (err) return res.send('Güncelleme hatası');
      res.redirect('/posts/' + id);
    });
  });
  
  module.exports = router;