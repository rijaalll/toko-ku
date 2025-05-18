const express = require('express');
const router = express.Router();
const db = require('../../../util/db_conn');

router.get("/", (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;