import React from 'react'
import { images } from '../../../asset';
import { Box, Grid, Stack, Typography, colors } from '@mui/material';
import Animate from './Animate';
import MPaper from './MPaper';

const summaryData = [
    {
        title: "Total Booking",
        value: "714k",
        image: images.loginBg
    },
    {
        title: "Sold",
        value: "311k",
        image: images.loginBg
    },
    {
        title: "Canceled",
        value: "122k",
        image: images.loginBg
    },
]



const SummaryGrid = () => {
    return (
        <Grid container spacing={3}>
            {summaryData.map((summary, index) => (
                <Grid key={index} item lg={4} xs={12}>
                    <Animate type="fade" delay={(index + 1) / 3}>
                        <MPaper>
                            <Stack direction="row"
                                alignItems="center"
                                justifyContent="space-between">
                                <Stack spacing={1}>
                                    <Typography variant='h4' fontWeight="bold">
                                        {summary.value}
                                    </Typography>
                                    <Typography variant='body2' fontWeight="bold" color={colors.grey[600]}>
                                        {summary.title}
                                    </Typography>
                                </Stack>

                                <Box sx={{
                                    height: "100px",
                                    width: "100px",
                                    "& img": { width: "100%" }
                                }}
                                >
                                    <img src={summary.image} alt="summary" />
                                </Box>
                            </Stack>
                        </MPaper>
                    </Animate>
                </Grid>
            ))
            }
        </Grid >
    )
}

export default SummaryGrid