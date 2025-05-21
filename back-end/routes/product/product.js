const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../../util/db_conn');

const dir = path.join(__dirname, '../../../assets/productImg');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function RandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const randomName = RandomString(5) + ext;
        cb(null, randomName);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


// POST /add
router.post("/add", upload.single('product_img'), (req, res) => {
    const { product_name, product_des, product_price, product_discount, product_stock, category } = req.body;
    let product_img = null;

    if (req.file) {
        product_img = 'assets/productImg/' + req.file.filename;
    } else if (typeof req.body.product_img === 'string') {
        product_img = req.body.product_img;
    } else {
        return res.status(400).json({ error: "Gambar produk tidak valid (harus file gambar atau URL string)." });
    }

    const productId = "PS-" + RandomString(3);

    db.query(
        "INSERT INTO product (product_id, product_name, product_des, product_price, product_discount, product_stock, product_img, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [productId, product_name, product_des, product_price, product_discount, product_stock, product_img, category],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Gagal menyimpan ke database." });
            }
            res.status(200).json({ message: "Produk berhasil ditambahkan", product_id: productId });
        }
    );
});


// POST /rating
router.post('/rating', async (req, res) => {
    const { from_userId, for_productId, rating, comment } = req.body;

    if (!from_userId || !for_productId || !rating || !comment) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating harus antara 1 dan 5' });
    }

    const query = `INSERT INTO rating (from_userId, for_productId, rating, comment) VALUES (?, ?, ?, ?)`;
    db.query(query, [from_userId, for_productId, rating, comment], (err, result) => {
        if (err) {
            console.error("INSERT error:", err);
            return res.status(500).json({ error: 'Gagal menyimpan data' });
        }

        res.status(201).json({ message: 'Data berhasil disimpan', id: result.insertId });
    });
});


// ✅ GET /all – Ambil semua produk
router.get("/all", (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Gagal mengambil data produk." });
        } else {
            res.status(200).send(result);
        }
    });
});


// GET /product/:uid
router.get("/:uid", (req, res) => {
    const { uid } = req.params;

    const productQuery = "SELECT * FROM product WHERE product_id = ?";
    const ratingQuery = "SELECT rating, comment, from_userId FROM rating WHERE for_productId = ?";

    db.query(productQuery, [uid], (err, productResults) => {
        if (err) return res.status(500).json({ error: 'Gagal mengambil data produk' });
        if (productResults.length === 0) return res.status(404).json({ error: 'Produk tidak ditemukan' });

        db.query(ratingQuery, [uid], (err, ratingResults) => {
            if (err) return res.status(500).json({ error: 'Gagal mengambil rating' });

            res.json({
                product: productResults[0],
                ratings: ratingResults
            });
        });
    });
});


// DELETE /product/:uid
router.delete("/:uid", (req, res) => {
    const { uid } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    const userQuery = "SELECT * FROM user WHERE username = ?";
    db.query(userQuery, [username], async (err, users) => {
        if (err) return res.status(500).json({ error: 'Gagal mengambil data user' });
        if (users.length === 0) return res.status(401).json({ error: 'User tidak ditemukan' });

        const user = users[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch || user.admin != 1) {
            return res.status(403).json({ error: 'Tidak diizinkan, hanya admin yang bisa menghapus produk' });
        }

        const deleteQuery = "DELETE FROM product WHERE product_id = ?";
        db.query(deleteQuery, [uid], (err, result) => {
            if (err) return res.status(500).json({ error: 'Gagal menghapus produk' });
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Produk tidak ditemukan' });
            }

            res.json({ message: 'Produk berhasil dihapus' });
        });
    });
});

// PUT /update/:productId - Update data produk
router.put("/update/:productId", upload.single('product_img'), (req, res) => {
    const { productId } = req.params;
    const {
        product_name,
        product_des,
        product_price,
        product_discount,
        product_stock,
        category
    } = req.body;

    if (!product_name || !product_des || !product_price || !product_stock || !category) {
        return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    let product_img = null;
    if (req.file) {
        product_img = 'assets/productImg/' + req.file.filename;
    } else if (typeof req.body.product_img === 'string') {
        product_img = req.body.product_img;
    }

    const query = `
        UPDATE product 
        SET product_name = ?, product_des = ?, product_price = ?, 
            product_discount = ?, product_stock = ?, product_img = ?, category = ?
        WHERE product_id = ?
    `;

    db.query(
        query,
        [product_name, product_des, product_price, product_discount, product_stock, product_img, category, productId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Gagal mengupdate produk." });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Produk tidak ditemukan." });
            }

            res.json({ message: "Produk berhasil diperbarui." });
        }
    );
});


module.exports = router;
