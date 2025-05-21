# 🛒 Panjul Shop API

REST API untuk manajemen user, produk, dan rating.

## 🌐 Base URL
```
http://127.0.0.1:[PORT]/api/v1
```

---

## 🔐 Auth

### ✅ POST `/auth/register`
Register user baru.

**Request Body:**
```json
{
  "username": "john123",
  "name": "John Doe",
  "password": "123456"
}
```

**Response:**
```json
{
  "message": "Registrasi berhasil",
  "uid": "user-Abc1",
  "token": "Token123Abc"
}
```

### ✅ POST `/auth/login`
Login user.

**Request Body:**
```json
{
  "username": "john123",
  "password": "123456"
}
```

**Response:**
```json
{
  "message": "Login berhasil",
  "uid": "user-Abc1",
  "name": "John Doe",
  "admin": 0,
  "token": "NewGeneratedToken123"
}
```

### ✅ GET `/auth/token/:token`
Validasi token user.

**Response:**
```json
{
  "message": "Token valid",
  "user": {
    "uid": "user-Abc1",
    "username": "john123",
    "name": "John Doe",
    "admin": 0
  }
}
```

---

## 📦 Product

### ✅ POST `/product/add`
Tambah produk baru.

**Form Data:**
- `product_name`
- `product_des`
- `product_price`
- `product_discount`
- `product_stock`
- `category`
- `product_img` (file gambar)

**Response:**
```json
{
  "message": "Produk berhasil ditambahkan",
  "product_id": "PS-Xy1"
}
```

### ✅ PUT `/product/update/:productId`
Update data produk.

**Form Data:**
- (Sama seperti `/product/add`)

**Response:**
```json
{
  "message": "Produk berhasil diperbarui."
}
```

### ✅ DELETE `/product/:uid`
Hapus produk berdasarkan ID (admin only).

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Produk berhasil dihapus"
}
```

### ✅ GET `/product/all`
Ambil semua produk.

**Response:**
```json
[
  {
    "product_id": "PS-Xy1",
    "product_name": "...",
    "product_des": "...",
    "product_price": 10000,
    ...
  }
]
```

### ✅ GET `/product/:uid`
Ambil detail produk dan rating.

**Response:**
```json
{
  "product": {
    "product_id": "PS-Xy1",
    "product_name": "...",
    ...
  },
  "ratings": [
    {
      "rating": 5,
      "comment": "Bagus",
      "from_userId": "user-Abc1"
    }
  ]
}
```

### ✅ POST `/product/rating`
Tambahkan rating untuk produk.

**Request Body:**
```json
{
  "from_userId": "user-Abc1",
  "for_productId": "PS-Xy1",
  "rating": 4,
  "comment": "Mantap sekali"
}
```

**Response:**
```json
{
  "message": "Data berhasil disimpan",
  "id": 5
}
```
