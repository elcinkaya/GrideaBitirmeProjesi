const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', pageController.getHomePage);
router.get('/register', pageController.getRegisterPage);
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.get('/dashboard', isAuthenticated, pageController.getDashboardPage);
router.get('/type', isAuthenticated, pageController.getWritePage);

module.exports = router;