const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.listen(port, () => {
    console.log(`api berjalan di : http://localhost:${port}`);
});