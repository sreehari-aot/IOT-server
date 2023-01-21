const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const { save } = require("./handlers/dbClient.js"); 
const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.json({limit: "16mb"}));


  
app.get('/', function (req, res) {
  res.send("Up and running")
})
app.use("/data", express.static(path.join(__dirname, "static")));

app.post("/publish",async (req,res)=>{

  const {person, pos_x, pos_y, vel_x, vel_y, o_id, timeStamp} = req.body
  let time = (timeStamp*1000000).toString()
  save({person, pos_x, pos_y, vel_x, vel_y, o_id, time})
  .then(()=>{
    console.log("Entry saved!")
    return res.status(201)
  })
  .catch(err=>{
    console.error("Fail", err)
    return res.status(500)
  })
  res.end()
})

app.listen(8000, ()=>{
  console.log("Server is running on port 8000");
})