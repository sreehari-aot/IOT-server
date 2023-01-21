import  React  from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



export const Graph = ({optionOnedata, optionTwodata})=>{

    
    const [displaydata, setDisplaydata] = React.useState([]);
    const [active_y, setActive_y] = React.useState();

    const changeGraph = (e)=>{
        if(e.target.value === "POSITION"){
            setDisplaydata(optionOnedata)
            setActive_y("pos_x")
        }else{
            setDisplaydata(optionTwodata)
            setActive_y("count")
        }
    }
    
    React.useEffect(()=>{
        setDisplaydata(optionOnedata);
        setActive_y("pos_x")
    },[optionOnedata])
    
    return <>
        <LineChart
          width={1000}
          height={300}
          data={displaydata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={active_y} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        <select name="options" onChange={(e)=>changeGraph(e)}>
            <option onClick={()=>alert("yes")} value="POSITION">position</option>
            <option value="COUNT">count</option>
        </select>
    </>
}