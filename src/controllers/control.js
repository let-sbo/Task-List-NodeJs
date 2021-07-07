const connection = require("express-myconnection");

const control = {};

control.list = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) next(err);
        console.log("success connection")
        connection.query("SELECT * FROM clients", (err, row, next) => {
            if (err) next(err);
            res.render("pages/list", { data: row });
        })
    })
};
control.add = (req, res, next) => {
    let data = req.body;
    req.getConnection((err, connection) => {
        if (err) next(err);
        connection.query("INSERT INTO clients set ?", data, (err, row) => {
            if (err) next(err);
            console.log(row);
            res.redirect("/");
        })
    })
};

control.delete = (req, res, next) => {
        let { id } = req.params;
        req.getConnection((err, connection) => {
            if (err) next(err);
            connection.query("DELETE FROM clients WHERE id = ?", [id], (err, row) => {
                if (err) next(err);
                console.log(row);
                res.redirect("/")
            })
        })
    }
    /* ============== FALTAN CAMBIOS DESDE AQUI ============== */
control.changeGet = (req, res, next) => {
    let { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) next(err);
        connection.query(`SELECT * FROM clients WHERE id = ${id}`, (err, client) => {
            if (err) next(err);
            console.log(client);
            res.render("pages/change", { data: client });
        })
    })
}
control.changePost = (req, res, next) => {
    let name = req.body.name,
        email = req.body.email,
        { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) next(err);
        console.log("first data: ", name, email, "id: ", id);
        connection.query(`UPDATE clients SET name = ?, email = ? WHERE id = ?`, [name, email, id], (err, data) => {
            if (err) next(err);
            console.log("data: ", data)
            res.redirect("/");
        })
    })
}

module.exports = control;