import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname+ "/timelinechart/"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/timelinechart/timeline.html");
    // res.render("/timelinechart/timeline.html"); 
});

app.get("/data",(req,res)=>{
  res.sendFile(__dirname + "/data/trialdata.csv");
});

app.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
});