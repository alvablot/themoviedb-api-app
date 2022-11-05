const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const md5 = require("md5");
const dbFile = "./data/users_db.db";
const exists = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile, (error) => {
    if (error) {
        //console.error(error.message);
        //throw error;
    }

    const usersStmt = `CREATE TABLE users (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    email VARCHAR (255) UNIQUE,
    password CHAR (60) DEFAULT (666) 
  )
  `;

    if (!exists) {
        db.run(usersStmt, (error) => {
            if (error) {
                console.error(error.message);
            } else {
                const insertUsers = `INSERT INTO users (
        id, 
        email, 
        password) VALUES (?, ?, ?)`;
                db.run(insertUsers, [uuid.v4(), "petter.karlsson@cmeducations.se", md5("666")]);
            }
        });
    }
});

module.exports = db;
