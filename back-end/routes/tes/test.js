const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send([{
        "succes": true,
        "data": {
            "message": "API is working",
            "version": "1.0.0"
        }
    }]);
});

module.exports = router;