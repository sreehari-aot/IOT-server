const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const { save } = require("./handlers/dbClient.js"); 
const app = express();
const path = require("path");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json({limit: "16mb"}));


  
app.get('/', function (req, res) {
  res.send("Up and running")
})
app.use("/data", express.static(path.join(__dirname, "static")));

const getEntry = (item, type) => {
  if(type == 1){
    return {
      "Person": item[0],
      "pos_x": item[1],
      "pos_y": item[2],
      "vel_x": item[3],
      "vel_y": item[4],
      "o_id": item[5],
      "timeStamp": item[6]
  }  }

  if(type == 2){
    return {
      "count": item[0],
      "timeStamp": item[1]
    }
  }
  
}

app.get("/get", (req, res)=>{
  const {limit, explain, count, src, query, timings, type} = req.query;
  const url = `http://localhost:9000/exec?query=${encodeURIComponent(query)}`

  axios.get(url)
  .then(response => {
      const data = response.data
      const dataClone = []
        if(data?.dataset){
            data.dataset.forEach((item, i)=>{
                let entry  = getEntry(item, type)
                  dataClone.push(entry)
            })
        }
      return res.json(dataClone)
  })
  .catch(error => {
      console.log(error);
      res.status(500)
  });

})


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