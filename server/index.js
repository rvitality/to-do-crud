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

app.listen(8800, () => {
    console.log("Connected to server...");
});
