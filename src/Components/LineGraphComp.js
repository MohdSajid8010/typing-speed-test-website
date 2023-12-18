import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import { useThemeContext } from '../context/ThemeContext';
const LineGraphComp = ({ curr_user_data, data2, vs }) => {

    console.log(
        // "curr_user_data", curr_user_data.map(obj => { return { "a": obj.timeStamp.toDate().toLocaleString(), "b": obj.wpm } }),
        // "data2", data2.map(obj => { return { "a": obj.timeStamp.toDate().toLocaleString(), "b": obj.wpm } }),
        // data2.map(obj => obj.timeStamp.toDate().toLocaleString())
    );
    console.log("accuracy")
    // console.log(curr_user_data.map(obj => obj.accuracy),
    //     data2.map(obj => obj.accuracy));

    const { theme } = useThemeContext()
    return (
        <div className='user-info-graph'>
            <Line className="line-component" data={
                {
                    // toLocaleString
                    labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"],
                    // labels: curr_user_data.map((obj) => obj.timeStamp.,"8thtoDate().toLocaleString().split(',')).reverse(),


                    datasets: [
                        {
                            label: "YOU",
                            data: [...curr_user_data].reverse().map((obj) => obj.wpm),
                            // borderColor: `${theme.typeBoxTextColor}`,
                            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            // fill:true

                        },
                        {
                            label: vs,
                            data: [...data2].reverse().map((obj) => obj.wpm),
                            // borderColor: `${theme.typeBoxTextColor}`,
                            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        }
                    ]
                }
            }
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Word Per Min Vs Nth Test",
                            font: { size: 25, },
                            color: theme.textColor,
                        },
                        legend: {
                            display: true,
                            position: "bottom", //   'top', 'bottom', 'left', 'right'

                            labels: {
                                font: { size: 25, },
                                color: theme.textColor,
                            },
                        },

                    },
                    animations: {
                        tension: {
                            duration: 4000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            // loop: true,
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: { size: 20, },
                                color: `${theme.typeBoxTextColor}`,
                            },
                            title: {//Time
                                display: true,
                                text: `No of Test`,
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
                                font: { size: 20, },
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
        </div>
    )
}

export default LineGraphComp
