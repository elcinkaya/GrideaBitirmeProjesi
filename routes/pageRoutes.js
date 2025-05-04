const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', pageController.getHomePage);
router.get('/register', pageController.getRegisterPage);
router.get('/login', pageController.getLoginPage);
router.get('/dashboard', isAuthenticated, pageController.getDashboardPage);
router.get('/write', isAuthenticated, pageController.getWritePage);

module.exports = router;