import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from "chart.js"

import { Line } from 'react-chartjs-2'
import { useThemeContext } from '../context/ThemeContext'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)


const Graph = ({ newGraphData }) => {
    let { theme } = useThemeContext()

    // let timeSet = new Set();
    // let newGraphData = graphData.filter((arr) => {
    //     if (!timeSet.has(arr[0])) {//if value not contain then add
    //         timeSet.add(arr[0]);
    //         return arr;
    //     }
    // })
    return (
        <>
            <Line data={{
                labels: newGraphData.map((arr) => arr[0]),//time
                datasets: [
                    {
                        data: newGraphData.map((arr) => arr[1]),//wpm
                        label: "wpm",
                        borderColor: theme.textColor,
                    },

                ]
            }} />
        </>
    )
}

export default Graph