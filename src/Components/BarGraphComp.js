import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import { useThemeContext } from '../context/ThemeContext';

const BarGraphComp = ({ curr_user_data, data2, vs }) => {
    // console.log(curr_user_data.map(obj => obj.wpm),
    //     data2.map(obj => obj.wpm));
    // console.log("accuracy")
    // console.log(curr_user_data.map(obj => obj.accuracy),
    //     data2.map(obj => obj.accuracy));

    const { theme } = useThemeContext()
    return (
        <div className='user-info-graph'>
            <Bar className='bar-component' data={{
                 labels: ["1st", "2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th"],
                datasets: [
                    {
                        label: "YOU",
                        data: [...curr_user_data].reverse().map((obj) => obj.accuracy),
                        // backgroundColor:"red"
                        // borderColor: `${theme.typeBoxTextColor}`,
                    },
                    {
                        label: vs,
                        data: [...data2].reverse().map((obj) => obj.accuracy),
                        // borderColor: `${theme.typeBoxTextColor}`,
                    }
                ]
            }}

                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Accuracy vs No of Test ",
                            color: `${theme.textColor}`,
                            font: { size: 25 }
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                color: `${theme.textColor}`,
                                font: { size: 25 },
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

                        },
                        y: {
                            ticks: {
                                font: { size: 20, },
                                color: `${theme.typeBoxTextColor}`,
                            },
                            title: {
                                display: true,
                                text: 'Accuracy',
                                color: `${theme.typeBoxTextColor}`,
                                font: { size: 20, },
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

export default BarGraphComp