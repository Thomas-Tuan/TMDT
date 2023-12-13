import { Box, CircularProgress, Grid, IconButton, Stack, Typography, colors } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Animate from './Animate';
import MPaper from './MPaper';


const SummaryGrid = ({ summaryData, isLoading }) => {
    const navigate = useNavigate();

    return (
        <>
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
                    <Grid container spacing={3}>
                        {summaryData.map((summary, index) => (
                            <Grid key={index} item md={6} lg={3} xs={12}>
                                <Animate type="fade" delay={(index + 1) / 3}>
                                    <MPaper>
                                        <Stack direction="row"
                                            alignItems="center"
                                            justifyContent="space-between">
                                            <Stack spacing={1}>
                                                {summary.id === "totalVenue" ?
                                                    <Typography variant='body1' fontWeight="bold">
                                                        {summary.value} <sup>Đ</sup>
                                                    </Typography>
                                                    :
                                                    <Typography variant='body1' fontWeight="bold">
                                                        {summary.value}
                                                    </Typography>
                                                }
                                                <Typography variant='body2' fontWeight="bold" color={colors.grey[600]}>
                                                    {summary.title}
                                                </Typography>
                                            </Stack>
                                            <IconButton onClick={() => navigate(`${summary.link}`)} >
                                                {summary.icon}
                                            </IconButton>
                                        </Stack>
                                    </MPaper>
                                </Animate>
                            </Grid>
                        ))
                        }
                    </Grid >
            }
        </>
    )
}

export default SummaryGrid