import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "to-do",
});

app.use(cors());
app.use(express.json());

app.get("/api/list", (req, res) => {
    const q = "SELECT * FROM todo";

    db.query(q, [], (err, data) => {
        if (err) res.status(500).json(err);

        return res.status(200).json(data);
    });
});

app.post("/api/list/add", (req, res) => {
    const q = "INSERT INTO todo(`title`, `status`) VALUES (?)";
    const values = [req.body.title, req.body.status];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
});

app.put("/api/list/:id", (req, res) => {
    const { id } = req.params;
    const q = "UPDATE  todo SET `title` = ?, `status` = ? WHERE `id` = ?";
    const values = [req.body.title, req.body.status];

    db.query(q, [...values, id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Item has been updated!");
    });
});

app.delete("/api/list/:id", (req, res) => {
    const { id } = req.params;

    const q = "DELETE FROM todo WHERE `id` = ?";

    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Item has been deleted.");
    });
});

app.listen(8800, () => {
    console.log("Connected to server...");
});
