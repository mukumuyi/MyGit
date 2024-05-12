import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import env from "dotenv";

import pg from "pg";
import oracledb from "oracledb";

const __dirname = import.meta.dirname;
const datadir = path.join(__dirname, "../90_data");

const app = express();
const port = 3000;
env.config();

// 静的ファイルの提供
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());

const pgdb = new pg.Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pgdb.connect();

// const oradb = await oracledb.getConnection ({
//   user          : process.env.ORA_USER,
//   password      : process.env.ORA_PASSWORD,
//   connectString : process.env.ORA_CONNECT,
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/api/filelist", (req, res) => {
  console.log("FILELIST GET START:", new Date().toLocaleTimeString("it-IT"));

  const fileList = fs.readdirSync(datadir);
  // console.log(fileList)
  const fileListJson = fileList
    .filter((item) => item.indexOf("csv") > 0)
    .map((item, index) => {
      const result = {
        id: index,
        name: item,
        value: item,
        label: item,
      };
      return { ...result };
    });
  res.json(fileListJson);
});

app.get("/api/file/:filename", (req, res) => {
  console.log("FILE GET START:", new Date().toLocaleTimeString("it-IT"));

  const filepath = path.join(datadir, req.params.filename);

  fs.readFile(filepath, { encoding: "utf8" }, (err, data) => {
    console.log(data);
    if (err) {
      res.status(404).send("File not found");
    } else {
      res.json(data);
    }
  });
});

app.post("/api/db", async (req, res) => {
  console.log("DB GET START:", new Date().toLocaleTimeString("it-IT"));
  console.log(req.body);
  try {
    // const pgdb = new pg.Client({
    //   host:req.body.host,
    //   database:req.body.database,
    //   user:req.body.user,
    //   password:req.body.password,
    //   port:req.body.port,
    // });

    // pgdb.connect();

    const result = await pgdb.query(req.body.sql);
    // const result = await db.query("SELECT id, name, color FROM public.users");

    //  oracle用コード
    //   const result = await oradb.execute(
    //     `SELECT manager_id, department_id, department_name
    //      FROM departments
    //      WHERE manager_id = :id`,
    //     [103],  // bind value for :id
    // );

    res.send(result);
  } catch (err) {
    console.error(err);
  }
  console.log("DB GET END:", new Date().toLocaleTimeString("it-IT"));
});

app.listen(port, () => {
  console.log(`listener open on port ${port}`);
});
