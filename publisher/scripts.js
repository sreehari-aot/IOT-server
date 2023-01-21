const axios = require('axios');

const dataUrl = 'http://localhost:8000/data/set1.json';
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


getData(dataUrl, async (data)=>{
    data.forEach(element => {
        let entry = {...element}
        for (let instance in entry.instances) {
            let payload = {
                "timeStamp":entry.timestamp.$date.$numberLong,
                "person": instance,
                "pos_x": entry.instances[instance]["pos_x"],
                "pos_y": entry.instances[instance]["pos_y"],
                "vel_x": entry.instances[instance]["vel_x"],
                "vel_y": entry.instances[instance]["vel_y"],
                "o_id": entry._id.$oid
            }
            postData(postUrl, payload)
        }
        
    });
})