const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const createTableQuery = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment primary key, name varchar(255))`;
const insertSql = `INSERT INTO people(name) values('Caio')`;
const fetchPeopleSql = `SELECT * FROM people`;
connection.query(createTableQuery);
connection.query(insertSql);
let people;
connection.query(fetchPeopleSql, (err, result) => {
  people = result.map((person) => person.name);
});
connection.end();

app.get("/", (req, res) => {
  res.send(`
    <h1>Full Cycle</h1>
    <ul>
      ${people.map((person) => `<li>${person}</li>`).join("")}
    </ul>
    `);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
