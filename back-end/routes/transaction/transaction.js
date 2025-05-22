const express = require('express');
const router = express.Router();
const db = require('../../util/db_conn');

function RandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

router.post('/', async (req, res) => {
    const { product_id, user_id, date, time } = req.body;
    const uid = 'transaction-' + RandomString(4);
    try {
        await db.query("INSERT INTO transaction (uid, product_id, user_id, date, time) VALUES (?, ?, ?, ?, ?)", 
            [uid, product_id, user_id, date, time]);
        res.status(201).json({ message: "Transaction created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query("UPDATE transaction SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: "Transaction status updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT t.*, ts.id AS status_id, ts.status_comment, ts.date AS status_date, ts.time AS status_time
            FROM transaction t
            LEFT JOIN transaction_status ts ON t.uid = ts.for_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/status', async (req, res) => {
    const { for_id, status_comment, date, time } = req.body;
    try {
        await db.query("INSERT INTO transaction_status (for_id, status_comment, date, time) VALUES (?, ?, ?, ?)", 
            [for_id, status_comment, date, time]);
        res.status(201).json({ message: "Transaction status added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
