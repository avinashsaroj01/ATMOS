import React from 'react';
import { Paper } from "@mantine/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export const options = {
    responsive: true,
    plugins: {
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};

const StatusPriorityChart = ({ dataArray, bgColorPalette }) => {

    const data = {
        labels: ['In Progress', 'Backlog', 'Stuck', 'Done', 'Status Not Selected'],
        datasets: [
            {
                label: 'High Priority',
                data: [
                    dataArray[0]['High'],
                    dataArray[1]['High'],
                    dataArray[2]['High'],
                    dataArray[3]['High'],
                    dataArray[4]['High'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[0],
                borderColor: 'rgb(65, 129, 217)',
            },
            {
                label: 'Medium Priority',
                data: [
                    dataArray[0]['Medium'],
                    dataArray[1]['Medium'],
                    dataArray[2]['Medium'],
                    dataArray[3]['Medium'],
                    dataArray[4]['Medium'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[1],
                borderColor: 'rgb(65, 129, 217)',
            },
            {
                label: 'Low Priority',
                data: [
                    dataArray[0]['Low'],
                    dataArray[1]['Low'],
                    dataArray[2]['Low'],
                    dataArray[3]['Low'],
                    dataArray[4]['Low'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[2],
                borderColor: 'rgb(65, 129, 217)',
            },
            {
                label: 'Choose Priority',
                data: [
                    dataArray[0]['Choose Priority'],
                    dataArray[1]['Choose Priority'],
                    dataArray[2]['Choose Priority'],
                    dataArray[3]['Choose Priority'],
                    dataArray[4]['Choose Priority'],
                ],
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette[3],
                borderColor: 'rgb(65, 129, 217)',
            },
        ],
    };

    // console.log(data, 'data from CombineBarChart');


    return (
        <>
            <Paper withBorder w={'40vw'} mt={'10px'}>
                <Bar options={options} data={data} style={{ minHeight: '350px', maxHeight: '350px' }} />
            </Paper>
        </>
    );
}

export default StatusPriorityChart;