import express from "express";
// import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

// for initial setting parameter
const settingfiledir = "./setting/setting.json";
const settingfile = JSON.parse(fs.readFileSync(settingfiledir));

app.use(express.static("public"));

app.get("/", (req, res) => {
//   console.log(settingfile)
  res.render("timeline.ejs",{settingfile:settingfile});
});

app.listen(port, () => {
  console.log(`listener open on port ${port}`);
});
