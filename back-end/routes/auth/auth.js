const express = require('express');
const router = express.Router();
const db = require('../../util/db_conn');
const bcrypt = require('bcrypt');

function RandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const SALT_ROUNDS = 10;


router.post('/register', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json({ error: 'Field tidak boleh kosong' });
    }

    db.query("SELECT * FROM user WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Query error' });

        if (results.length > 0) {
            return res.status(400).json({ error: 'Username sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const uid = 'UID-' + RandomString(6);
        const token = RandomString(30);

        db.query(
            "INSERT INTO user (uid, username, name, admin, password, token) VALUES (?, ?, ?, ?, ?, ?)",
            [uid, username, name, '0', hashedPassword, token],
            (err, result) => {
                if (err) return res.status(500).json({ error: 'Gagal register' });

                res.status(201).json({ message: 'Registrasi berhasil', uid, token });
            }
        );
    });
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Field tidak boleh kosong' });
    }

    db.query("SELECT * FROM user WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Query error' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Username tidak ditemukan' });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Password salah' });
        }

        const newToken = RandomString(30);

        db.query("UPDATE user SET token = ? WHERE id = ?", [newToken, user.id], (err) => {
            if (err) return res.status(500).json({ error: 'Gagal update token' });

            res.status(200).json({
                message: 'Login berhasil',
                uid: user.uid,
                name: user.name,
                admin: user.admin,
                token: newToken
            });
        });
    });
});


router.get('/token/:token', (req, res) => {
    const { token } = req.params;

    db.query("SELECT uid, username, name, admin FROM user WHERE token = ?", [token], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            res.status(500).json({ error: 'Query error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Token tidak valid' });
        }

        res.status(200).json({
            message: 'Token valid',
            user: results[0]
        });
    });
});

module.exports = router;