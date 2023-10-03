import React from 'react'
import { Pie } from 'react-chartjs-2'
import { useThemeContext } from '../context/ThemeContext';

const PieChart = ({ curr_user_data, data2, vs }) => {
    let { theme } = useThemeContext()
    const data = {
        labels: ['You', `${vs}`],
        datasets: [
            {
                label: 'No of Test',
                data: [curr_user_data.length, data2.length],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        plugins: {
            title: {
                display: true,
                text: `Yout Total Test vs ${vs} Total Test`,
                color: `${theme.textColor}`,
                font: { size: 25 },
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
        // responsive:true,
        // maintainAspectRatio:false,

    }
    return (
        <div className='user-info-graph' >
            <Pie className='pie-chart' data={data} options={option} />
        </div>
    )
}

export default PieChart