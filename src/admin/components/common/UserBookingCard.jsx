import React from 'react'
import MPaper from './MPaper'
import { Avatar, Box, Stack, Typography, colors } from '@mui/material'
import { ImagesBg } from '../../../asset'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'

const UserBookingCard = () => {
    return (
        <MPaper title="Latest booking">
            <Stack spacing={3}>
                {/* user info */}
                <Stack direction="row" spacing={2}>
                    <Avatar alt="user" src={ImagesBg.loginBg} />
                    <Stack justifyContent="space-between">
                        <Typography variant='subtitle2'>
                            TU aaan
                        </Typography>
                        <Typography variant='caption' color={colors.grey[500]}>
                            31/10/2002
                        </Typography>
                    </Stack>
                </Stack>
                {/* user info */}
                {/* booking info */}
                <Stack direction="row"
                    alignItems="center"
                    spacing={5}
                    sx={{
                        color: colors.grey[600]
                    }}>
                    <Stack direction="row"
                        spacing={1}
                        alignItems="center">
                        <CalendarMonthOutlinedIcon fontSize='small' />
                        <Typography variant='body2' fontWeight={600}>
                            5 days 4 nights
                        </Typography>
                    </Stack>
                    <Stack direction="row"
                        spacing={1}
                        alignItems="center">
                        <PeopleAltOutlinedIcon fontSize='small' />
                        <Typography variant='body2' fontWeight={600}>
                            5 - 6 guests
                        </Typography>
                    </Stack>
                </Stack>
                {/* booking info */}
                {/* image */}
                <Box sx={{
                    pt: "100%",
                    position: "relative",
                    "& img": {
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        width: "100%",
                        borderRadius: 8
                    }
                }}
                >
                    <img src={ImagesBg.candleBg} alt="booking" />
                </Box>
                {/* image */}
            </Stack>
        </MPaper>
    )
}

export default UserBookingCard