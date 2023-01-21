import React from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { Heatmap } from './components/Heatmap';
import axios from 'axios'


const optionOneUrl = "http://localhost:8000/get?query=SELECT%20*%20from%20%27Human%27&timings=true&type=1"
const optionTwoUrl = "http://localhost:8000/get?query=SELECT%20count()%2C%20timestamp%20from%20%27Human%27%20GROUP%20BY%20timestamp&timings=true&type=2"

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

function App() {
  const [optionOnedata, setOptionOneData] = React.useState([]);
  const [optionTwodata, setOptionTwoData] = React.useState([]);
    React.useEffect(()=>{
      getData(optionOneUrl, setOptionOneData)
      getData(optionTwoUrl, setOptionTwoData)
  },[]);
  return <>
   <Graph  optionOnedata={optionOnedata} optionTwodata={optionTwodata} />
   <div><hr/></div>
    <Heatmap optionOnedata={optionOnedata} optionTwodata={optionTwodata} />
  </>
       
}

export default App;
