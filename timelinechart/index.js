import express from "express";
// import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const datadir = path.join(__dirname, '../data');

const app = express();
const port = 3000;

// for initial setting parameter
const settingfiledir = "./setting/setting.json";
const settingfile = JSON.parse(fs.readFileSync(settingfiledir));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.render("timeline.ejs", { settingfile: settingfile });
});

app.get("/setting", (req, res) => {
  res.download(__dirname + "/setting/default_setting.json");
});

app.get("/data", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`listener open on port ${port}`);
});
