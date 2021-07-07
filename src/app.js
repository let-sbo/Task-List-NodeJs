const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const connection = require("express-myconnection");
const router = require("./router/rout");
const path = require("path");
const app = express();

/* ============== SETTING ============== */
app.set("port", process.env.PORT || 8000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ============== MIDDLEWARE ============== */

app.use(morgan("dev"));

app.use(connection(mysql, {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mypassword",
    database: "dataclients"
}, "single"));
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

/* ============== ROUTS ============== */
/* ============== STATIC FILES============== */
app.use(express.static(path.join(__dirname, "public")))

app.listen(app.get("port"), () => {
    console.log("server on port " + app.get("port"));
})