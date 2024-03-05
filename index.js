import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public")); 

app.get("/",(req,res)=>{
    res.render("index.ejs",{reqtype:req.url}); 
});

app.get("/Links",(req,res)=>{
  res.render("Links.ejs",{reqtype:req.url}); 
});

app.get("/Orders",(req,res)=>{
  res.render("Orders.ejs",{reqtype:req.url}); 
});

app.get("/Products",(req,res)=>{
  res.render("Products.ejs",{reqtype:req.url}); 
});

app.get("/Dashboard",(req,res)=>{
  res.render("Dashboard.ejs",{reqtype:req.url}); 
});


app.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
});