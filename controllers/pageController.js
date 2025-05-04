const path = require('path');

exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.getDashboardPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
};

exports.getWritePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/yaz.html'));
  };