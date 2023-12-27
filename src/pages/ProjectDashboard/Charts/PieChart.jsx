import { Paper } from '@mantine/core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({
    userInfo,
    basicData,
    bgColorPalette
}) => {


    const data = {
        labels: Object.keys(basicData),
        datasets: [
            {
                data: Object.values(basicData),
                // backgroundColor: 'rgb(130, 205, 255)',
                backgroundColor: bgColorPalette,

            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
            // maintainAspectRatio: true,
        },
    };

    return (
        <>
            <Paper withBorder w={'40vw'} mt={'10px'}>
                <Pie data={data} options={options} style={{ minHeight: '350px', maxHeight: '350px' }} />
            </Paper>
        </>
    );
}

export default PieChart;