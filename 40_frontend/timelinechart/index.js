import express from "express";
// import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import pg from "pg"

const __dirname = import.meta.dirname;
const datadir = path.join(__dirname, '../data');

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'YTK@pg',
  port: 5432
});

db.connect();

const app = express();
const port = 3000;

// for initial setting parameter
const settingDir = "./setting/setting.json";
const settingFile = JSON.parse(fs.readFileSync(settingDir));
const dataPtnDir = "./setting/dataPtn.json";
const dataPtnFile = JSON.parse(fs.readFileSync(dataPtnDir));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", async (req, res) => { 
  const result = await db.query('select * from timeline')
  const inputData = result.rows;
  // console.log(inputData);
  console.log('MAIN GET START:',new Date().toLocaleTimeString("it-IT"));
  res.render("timeline.ejs", { settingfile: settingFile,dataPtnFile:dataPtnFile,inputData:inputData });

  console.log('MAIN GET END:',new Date().toLocaleTimeString("it-IT"));
});

app.get("/setting", (req, res) => {
  res.download(__dirname + "/setting/default_setting.json");
});

app.get("/data", (req, res) => {
  console.log('DATA GET START:',new Date().toLocaleTimeString("it-IT"));
  try{
    if (fs.existsSync(datadir + "/" + req.query.filename + ".csv")){
      res.sendFile(datadir + "/" + req.query.filename + ".csv");
    } else {
      res.send('There is no file')
      console.log('There is no file')
    }    
  } catch {
    res.send('There is a error')
    console.log('There is a error')
  }  
  console.log('DATA GET END:',new Date().toLocaleTimeString("it-IT"));
});

app.listen(port, () => {
  console.log(`listener open on port ${port}`);
});
