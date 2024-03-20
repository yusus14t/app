import { Line, Doughnut } from 'react-chartjs-2';
import {  Chart as ChartJS, CategoryScale, LinearScale, PointElement,  LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);


const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        
    },
};


export const LineChart = ({ filterType, labelName, chartData }) => {
    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels: filterType === 'week' ? weekLabels : monthLabels,
        datasets: [
            {
                label: labelName,
                data: filterType === 'week' ?  chartData.week || [] : chartData.month || [],
                borderColor: '#112C2F',
                backgroundColor: '#112C2F',
                pointRadius: 3,
                borderWidth: 2,
            },
        ],
    };
    return(
        <Line options={chartOptions} data={data} />
    )
}


export const DoughnutChart = ({ chartData }) => {
    const DoughnutChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 16,
                        color: '#000'
                    },
                }
            },
            
        },
    };

    const data = {
        labels: chartData?.length ? chartData.filter( e => e._id ).map( e => e._id ?? 'other') : [],
        datasets: [
          {
            label: 'Totals',
            data: chartData?.length ? chartData.filter( e => e._id ).map( e => e.count ) : [],
            backgroundColor: ["#4A55A2", "#7895CB","#C5DFF8"] ,
            borderColor: '#fff',
            borderWidth: 3,
          },
        ],
    }

    return(
        <Doughnut
            options={DoughnutChartOptions}
            data={data}
        />
    )
}