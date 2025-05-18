require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./util/db_conn");
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./routes/tes/test"));

app.use("/api/v1/product/all", require("./routes/product/all/allProduct"));
app.use("/api/v1/product/add", require("./routes/product/add/addProduct"));



app.listen(port, () => {
    console.log(`api berjalan di : http://127.0.0.1:${port}/api/v1`);
});