import { Box, CircularProgress, LinearProgress, Stack, Typography, colors, linearProgressClasses } from '@mui/material';
import React from 'react';
import MPaper from './MPaper';

const BookedData = ({ isLoading, bookedData }) => {

    return (
        <MPaper title="Đơn đặt" fulHeight>
            {
                isLoading ?
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
                        {bookedData.map((data, index) => (
                            <Stack spacing={1} key={index}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant='caption' fontWeight="600">
                                        {data.title}
                                    </Typography>
                                    <Typography variant='caption' fontWeight="600">
                                        {data.value}
                                    </Typography>
                                </Stack>
                                <Box>
                                    <LinearProgress variant='determinate'
                                        value={data.percent}
                                        sx={{
                                            bgcolor: colors.grey[200],
                                            height: 10,
                                            borderRadius: 5,
                                            [
                                                `& .${linearProgressClasses.bar}`
                                            ]: {
                                                borderRadius: 5,
                                                bgcolor: data.color
                                            }
                                        }} />
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
            }

        </MPaper>
    )
}

export default BookedData