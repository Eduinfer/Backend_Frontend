const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '51320',
  database: 'salespot',
});

module.exports = connection;
