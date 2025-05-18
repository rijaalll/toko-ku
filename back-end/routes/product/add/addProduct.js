const express = require('express');
const router = express.Router();
const db = require('../../../util/db_conn');

router.post("/", (req, res) => {
    const { name, description, price, stock, image } = req.body;
    db.query("INSERT INTO product (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)", [name, description, price, stock, image], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    })    
})

module.exports = router;