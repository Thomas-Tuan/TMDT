import { Box, CircularProgress, Stack, Typography, circularProgressClasses, colors } from '@mui/material';
import React from 'react';
import MPaper from './MPaper';

const FavouriteData = ({ favouriteData, isLoading }) => {
    const usedColors = [];
    const calculateTotalCount = () => {
        return favouriteData.reduce((total, product) => total + product.totalCount, 0);
    };

    const getRandomColor = (usedColors, randomColors) => {
        let randomColor;
        if (randomColors) {
            do {
                randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
            } while (usedColors.includes(randomColor));

            usedColors.push(randomColor);
        }
        return randomColor;
    };


    return (
        <MPaper title="Top 5 sản phẩm được yêu thích">
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
                    <Stack spacing={2}>
                        <Stack direction="row"
                            alignItems="center"
                            justifyContent="center"
                            p={3}>
                            <Box position="relative">
                                <CircularProgress
                                    variant='determinate'
                                    size={200}
                                    value={100}
                                    sx={{
                                        color: colors.green[600],
                                        [`& .${circularProgressClasses.circle}`]: {
                                            strokeLinecap: "round"
                                        }
                                    }}
                                />
                                <Box sx={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%,-50%)"
                                }}>
                                    <Typography
                                        textAlign="center"
                                        variant='subtitle2'
                                        color={colors.grey[600]}>
                                        Đánh giá
                                    </Typography>
                                    <Typography
                                        textAlign="center"
                                        variant='h6'
                                    >
                                        {calculateTotalCount()}
                                    </Typography>
                                </Box>

                            </Box>
                        </Stack>
                        <Stack spacing={1}>
                            {favouriteData.length !== 0 && favouriteData.map((data, index) => {
                                const randomColor = getRandomColor(usedColors, ["#ff4d4d", "#ff7733", "#ffff00", "#1a1aff", "#00e68a"]);
                                return (
                                    <Stack key={index}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between">
                                        <Stack direction="row"
                                            alignItems="center">
                                            <Box sx={{
                                                width: "15px",
                                                height: "15px",
                                                borderRadius: "4px",
                                                bgcolor: randomColor,
                                                mr: 1
                                            }} />
                                            <Typography sx={{
                                                width: 250,
                                            }} variant='subtitle2' color={colors.grey[700]}>
                                                {data.name}
                                            </Typography>
                                        </Stack>
                                        <Typography variant='subtitle2'>
                                            {data.totalCount} đánh giá
                                        </Typography>
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </Stack>
            }
        </MPaper>
    )
}

export default FavouriteData