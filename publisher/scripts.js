const axios = require('axios');

const dataUrl = 'http://localhost:8000/data/set2.json';
const postUrl = 'http://localhost:8000/publish';


const postData = (url, data) => {
    axios.post(url, data)
      .then((response) =>{
        console.log("Request posted successfully");
      })
      .catch(error => {
        console.log("Failed to post request",error);
    });
}


const getData = (url, done)=>{
    axios.get(url)
    .then(response => {
        const data = response.data
        done(data)
    })
    .catch(error => {
        console.log(error);
    });
}

getData(dataUrl, (data)=>{
    data.forEach(element => {
        for (let instance in element.instances) {
            let payload = {
                "timeStamp":element.timestamp.$date.$numberLong,
                "person": instance,
                "pos_x": element.instances[instance]["pos_x"],
                "pos_y": element.instances[instance]["pos_y"],
                "vel_x": element.instances[instance]["vel_x"],
                "vel_y": element.instances[instance]["vel_y"],
                "o_id": element._id.$oid
            }
            postData(postUrl, payload)
        }
        
    });
})