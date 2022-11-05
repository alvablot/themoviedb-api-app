const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const db = require("../database.js");
let users;
let token = false;
let activeUser = {};
const deleteRow = "DELETE FROM users";
const insertRow = "INSERT INTO users";
const updateRow = "UPDATE users";
const fetchTable = "SELECT * FROM users";

function initTable(query) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            resolve(rows);
        });
    });
}

function getUser(query) {
    return new Promise((resolve, reject) => {
        db.get(query, (err, rows) => {
            resolve(rows);
        });
    });
}

async function getAll() {
    const query = fetchTable;
    const result = await initTable(query);
    return result;
}

async function addOne(data) {
    const { email, password } = data;
    if (!email || !password) return 400;
    const existingUser = await getUser(`SELECT * FROM users WHERE email = '${email}'`);
    if (existingUser !== undefined) {
        if (email === existingUser.email) return 409;
    }
    const query = `${insertRow} (id, email, password)  VALUES(?, ?, ?)`;
    db.run(query, [uuid.v4(), email, md5(password)]);
    users = initTable(fetchTable);
    return users;
}

async function login(id, data) {
    const { email, password } = data;
    if (!email || !password) return 400;

    const existingUser = await getUser(`SELECT * FROM users WHERE email = '${email}'`);
    if (existingUser === undefined) return 404;
    const hashedPassword = md5(password);
    const checkPassword = await getUser(`SELECT * FROM users WHERE password = '${hashedPassword}'`);
    if (checkPassword === undefined) return 404;

    //////// INLOGGAD
    console.log("Right password");
    token = jwt.sign(
        {
            id: existingUser.id,
            //username: existingUser.username,
            email: existingUser.email,
        },
        process.env.SECRET_KEY
    );
    activeUser = {
        id: existingUser.id,
        password: hashedPassword,
    };
    return token;
}

async function lendOne(bookId) {
    const id = activeUser.id;
    if (!token) return 403;
    if (!bookId) return 404;
    function updatePart(col, data) {
        db.run(
            `${bookUserId}
      SET ${col} = ?
      WHERE id = ?`,
            [id, bookId]
        );
    }
    updatePart("user_id", id);

    const user = getOne(id);
    return user;
}

async function returnOne(bookId) {
    const id = activeUser.id;
    if (!token) return 403;
    if (!bookId) return 404;
    db.run(
        `
  UPDATE books SET user_id = ?
    WHERE id = ?`,
        ["NULL", bookId]
    );
    const user = getOne(id);
    return user;
}

async function deleteOne(id) {
    const query = `${fetchTable} WHERE id = '${id}'`;
    let result = await initTable(query);
    if (result.length < 1) return 404;
    db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
    users = initTable(fetchTable);
    return users;
}

module.exports = {
    getAll,
    addOne,
    login,
    lendOne,
    returnOne,
    deleteOne,
};
