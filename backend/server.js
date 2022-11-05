require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const votes = require("./votes.json");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cors());

const usersRouter = require("./routers/users.router");

app.get("/votes", (req, res) => {
    res.status(200).send({ votes });
});

app.post("/votes", (req, res) => {
    if (!req.body.vote) {
        return res.status(400).json({ error: "Vote missing" });
    }
    if (!req.body.id) {
        return res.status(400).json({ error: "ID missing" });
    }

    votes.push({
        id: req.body.id,
        vote: req.body.vote,
    });
    console.log(votes);
    const stringedJSON = JSON.stringify(votes, null, 2);

    fs.writeFile("./votes.json", stringedJSON, (err) => {
        if (err) throw err;
        console.log("Wrote to votes.json");
    });

    res.send(votes);
});
app.use(usersRouter);
app.listen(4000, () => {
    console.log("⸸ SATAN'S SERVER RUNS ON PORT 4000 ⸸");
});
