import React from 'react'
import MPaper from './MPaper'
import { Box, Stack, Typography, colors } from '@mui/material'
import { Bar } from 'react-chartjs-2'

const chartsData = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
        {
            label: "Sold",
            data: [100, 90, 70, 20, 50, 60, 70, 75, 30, 50, 55, 60],
            stack: "stack 0",
            backgroundColor: colors.green[600],
            barPercentage: 0.6,
            categoryPercentage: 0.7,
        },
        {
            label: "Canceled",
            data: [10, 20, 30, 20, 25, 35, 40, 45, 5, 10, 15, 25],
            stack: "stack 1",
            backgroundColor: colors.red[300],
            barPercentage: 0.6,
            categoryPercentage: 0.7,
        },
    ]
}

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

const StaticData = () => {
    return (
        <MPaper title="Static">
            <Stack spacing={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='body2'>
                        (+43% sold | +12% canceled) than last year
                    </Typography>
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
        </MPaper>
    )
}

export default StaticData