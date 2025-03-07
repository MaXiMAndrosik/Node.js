const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.sqlite');
// const db = new sqlite3.Database(':memory:');

function createDataBase() {
  db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, firstName TEXT, secondName TEXT, age INTEGER, city TEXT)');
  const statement = db.prepare('INSERT INTO users (firstName, secondName, age, city) VALUES (?, ?, ?, ?)');
  statement.run('Test_Name', 'Test_SecondName', 100, 'Test_City');
  statement.finalize();
  db.close();
  console.log('Database created');
}

function getUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) return reject(err)
      const items = rows ?? null;
      resolve(items)
    });
  })
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id=?", id, (err, row) => {
      if (err) return reject(err)
      const item = row ?? null;
      resolve(item)
    });
  })
}

function addUser(firstName, secondName, age, city) {
  const statement = db.prepare('INSERT INTO users (firstName, secondName, age, city) VALUES (?, ?, ?, ?)');
  statement.run(firstName, secondName, age, city);
  statement.finalize();
}

function updateUser(id, firstName, secondName, age, city) {
  const statement = db.prepare('UPDATE users SET firstName=?, secondName=?, age=?, city=? WHERE id=?');
  statement.run(firstName, secondName, age, city, id);
  statement.finalize();
}

function deleteUser(id) {
  db.run("DELETE FROM users WHERE id=?", id);
}

module.exports = { createDataBase, getUsers, getUser, addUser, updateUser, deleteUser }
