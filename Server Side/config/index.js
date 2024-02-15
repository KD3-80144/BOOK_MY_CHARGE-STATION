var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "manager",
  database: "book_my_charge_station",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected Successfully!");
});

module.exports = connection;
