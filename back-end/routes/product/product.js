const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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


router.get("/all", (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;
