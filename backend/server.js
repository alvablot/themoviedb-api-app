const express = require("express");
const cors = require("cors");
const fs = require("fs");
const names = require("./names.json");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({ data: "Get worldy hellos!" });
});

app.post("/", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Name missing" });
    }

    names.push({
        name: req.body.name,
    });
    console.log(names);
    const stringedJSON = JSON.stringify(names, null, 2);

    fs.writeFile("./names.json", stringedJSON, (err) => {
        if (err) throw err;
        console.log("Wrote to names.json");
    });

    res.send(names);
});

app.listen(4000, () => {
    console.log("Servern kör på port 4000");
});
