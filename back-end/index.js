require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./util/db_conn");
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./routes/tes/test"));

/* 
======================
    AUTH API ROUTES
======================
*/
app.use("/api/v1/auth", require("./routes/auth/auth"));

/* 
======================
  PRODUCT API ROUTES
======================
*/
app.use("/api/v1/product", require("./routes/product/product"));



app.listen(port, () => {
    console.log(`api berjalan di : http://127.0.0.1:${port}/api/v1`);
});