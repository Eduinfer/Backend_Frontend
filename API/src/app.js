const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql')
const myConnection = require('express-myconnection');

const app = express();

// importing routes
const conPersonas = require('./controllers/conPersonas')

// Settings

app.set('port', process.env.PORT || 3000);

// middLewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    // password: '1234',
    // port: '3306',
    database: 'PROYECTO'
}, 'single'))
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', conPersonas);

// static files
app.use(express.static(path.join(__dirname, 'public')))

// starting server
app.listen(app.get('port'), () =>{
    console.log('Server en http://localhost:3000');
})


