import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import env from "dotenv";

const __dirname = import.meta.dirname;
const datadir = path.join(__dirname, "../data");

const app = express();
const port = 3000;
env.config();


// 静的ファイルの提供
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors())

const db = new pg.Client({
  host:process.env.PG_HOST,
  database:process.env.PG_DATABASE,
  user:process.env.PG_USER,
  password:process.env.PG_PASSWORD,
  port:process.env.PG_PORT,
});

db.connect();

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// app.get("/setting", (req, res) => {
//   res.download(__dirname + "/setting/default_setting.json");
// });

// app.get("/data", (req, res) => {
//   console.log("DATA GET START:", new Date().toLocaleTimeString("it-IT"));
//   try {
//     if (fs.existsSync(datadir + "/" + req.query.filename + ".csv")) {
//       res.sendFile(datadir + "/" + req.query.filename + ".csv");
//     } else {
//       res.send("There is no file");
//       console.log("There is no file");
//     }
//   } catch {
//     res.send("There is a error");
//     console.log("There is a error");
//   }
//   console.log("DATA GET END:", new Date().toLocaleTimeString("it-IT"));
// });

app.post("/api/task", async (req, res) => {
  console.log("DB GET START:", new Date().toLocaleTimeString("it-IT"));
  console.log(req.body);
  try {
    const result = await db.query(req.body.sql);
    // const result = await db.query("SELECT id, name, color FROM public.users");
    res.send(result);
  } catch (err) {
    console.error(err);
  }
  console.log("DB GET END:", new Date().toLocaleTimeString("it-IT"));
});

app.listen(port, () => {
  console.log(`listener open on port ${port}`);
});
