import React from 'react'
import MPaper from './MPaper'
import { Box, CircularProgress, Stack, Typography, colors } from '@mui/material'
import { Bar } from 'react-chartjs-2'

const charOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
        x: {
            grid: { display: false },
            stacked: true,
        },
        y: {
            stacked: true,
        }
    },
    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    elements: {
        bar: {
            borderRadius: 10
        }
    }
};

const StaticData = ({ orderList, isLoading }) => {
    const filteredData = orderList.filter(order => order.status === 1 || order.status === 2);

    const ordersByMonth = filteredData.reduce((acc, order) => {
        const month = new Date(order.date).getMonth() + 1;
        const key = `${month}`;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(order);
        return acc;
    }, {});

    const labels = Object.keys(ordersByMonth).sort((a, b) => parseInt(b) - parseInt(a));
    const datasets = labels.map(month => {
        const orders = ordersByMonth[month];
        const total = orders.reduce((acc, order) => {
            acc += order.total;
            return acc;
        }, 0);
        return total;
    });

    const chartsData = {
        labels: labels,
        datasets: [
            {
                label: "Doanh thu",
                data: datasets,
                stack: "stack 0",
                backgroundColor: colors.green[600],
                barPercentage: 0.6,
                categoryPercentage: 0.7,
            },
        ],
    };

    return (
        <MPaper title="Doanh thu theo tháng">
            {isLoading ?
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <CircularProgress sx={{
                        m: 2
                    }} />
                    <Typography >Loading data...</Typography>
                </Box>
                :
                <Stack spacing={4}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={3} alignItems="center">
                            {chartsData.datasets.map((data, index) => (
                                <Stack key={index} direction="row"
                                    alignItems="center">
                                    <Box sx={{
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "4px",
                                        bgcolor: data.backgroundColor,
                                        mr: 1
                                    }} />
                                    <Typography variant='subtitle2'>
                                        {data.label}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                    {/* bar chart */}
                    <Box>
                        <Bar options={charOptions} data={chartsData} height="300px"></Bar>
                    </Box>
                    {/* bar chart */}
                </Stack>
            }
        </MPaper>
    )
}

export default StaticData