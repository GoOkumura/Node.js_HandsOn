const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require("mysql2");

// DBの設定
const pool = mysql.createConnection({
  host: "node-mysql",
  user: "root",
  password: "password",
  port: 3306,
  database: "node",
});


//  一覧取得
app.get("/", (req, res) => {
  try {
      //  OK
    pool.query("SELECT * FROM `todos`", function (err, results, fields) {
      console.log(results); // results contains rows returned by server

      return res.json({
        todo: results,
        });
      });
    } catch (err) {
      //  NG
      console.error(err);
    }
  });

//  追加
app.post("/todo/add", (req, res) => {
    const body = req.body;
  
    try {
      //  OK
      pool.query(
        "INSERT INTO `todos` (id, name, description) values (null, ?, ?)",
        [body.name, body.description],
        function (err, results, fields) {
          console.log(results); // results contains rows returned by server
  
          return res.json({ status: true });
        }
      );
    } catch (err) {
      console.error(err);
    }
  });

// 課題① 取得
app.get("/todo/:id", (req, res) => {
  return res.json({});
});

// 課題② 編集
app.put("/todo/:id", (req, res) => {
  return res.json({ status: true });
});

// 課題③ 削除
app.delete("/todo/:id", (req, res) => {
  return res.json({ status: true });
});

//  サーバー起動
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});