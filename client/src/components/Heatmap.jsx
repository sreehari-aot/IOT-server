import  React  from 'react';
import HeatMap from "react-heatmap-grid"

export const Heatmap = ({optionOnedata, optionTwodata}) =>{

    const [xLabels, setXLabels] = React.useState([])
    const [yLabels, setYLabels] = React.useState([])
    const [data, setData] = React.useState([])
    
    return <>
    <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
    </>
}