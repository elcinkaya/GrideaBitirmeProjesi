const express = require('express');
const path = require('path'); 
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use (express.static(path.join(__dirname, 'public')));

//------------//
app.use (bodyParser.urlencoded ({ extended: true }));
app.use (session({
    secret: process.env.SESSION_SECRET || 'guvenli_anahtar',
    resave: false,
    saveUninitialized: true
}));



const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use ('/', pageRoutes);
app.use ('/', authRoutes);
app.use ('/', postRoutes);



module.exports = app;