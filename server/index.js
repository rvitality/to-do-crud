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

app.listen(8800, () => {
    console.log("Connected to server...");
});
