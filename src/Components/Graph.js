import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useThemeContext } from '../context/ThemeContext'


ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ newGraphData, vsDateOrTime }) => {
    // console.log(newGraphData)
    let { theme } = useThemeContext()

    return (
        <>
            <Line className="line-component"
                data={{
                    labels: vsDateOrTime === 'Time(sec)' ? newGraphData.map((arr) => arr[0]) : newGraphData.map((arr) => arr[0]).reverse(),//time/date
                    datasets: [
                        {
                            data: newGraphData.map((arr) => arr[1]),//wpm
                            label: `Word Per Minutes vs ${vsDateOrTime}`,
                            borderColor: `${theme.typeBoxTextColor}`,

                        },
                        // newGraphData[0].length === 3 ? ({
                        //     label: `date vs Accuracy`,
                        //     data: newGraphData.map((arr) => arr[2]),//Accuracy
                        //     borderColor: 'red',
                        //     font: {
                        //         size: 20
                        //     }
                        // }) : ({ label: `` })

                    ],
                }}
                options={{
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: { size: 15, },
                                color: `${theme.typeBoxTextColor}`,
                            },
                            title: {//Time
                                display: true,
                                text: `${vsDateOrTime}`,
                                color: `${theme.typeBoxTextColor}`,
                                // color:'red',
                                font: { size: 20, },
                            },
                            grid: {
                                color: `${theme.textColor}`,// x - direction line
                            },
                        },
                        y: {
                            ticks: {
                                font: { size: 15, },
                                color: `${theme.typeBoxTextColor}`,
                            },
                            title: {
                                display: true,
                                text: 'WPM',
                                color: `${theme.typeBoxTextColor}`,
                                font: { size: 20, },
                            },
                            grid: {
                                color: `${theme.textColor}`,
                                // color: 'red',

                            },
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }}
            />
        </>
    );
};
export default Graph;
