import { Grid, Paper } from "@mui/material";
import React from 'react';
import { ImagesBg } from "../../asset";

const Branch = () => {
    var branchData = [
        {
            Name: "arcahorn",
            Image: ImagesBg.arcahornBg,
        },
        {
            Name: "ralphlauren",
            Image: ImagesBg.ralphlaurenBg,
        },
        {
            Name: "rivierelogo",
            Image: ImagesBg.riviereBg
        },
        {
            Name: "trudonlogo",
            Image: ImagesBg.trudonBg
        },
    ]
    return (
        <Grid container >
            {branchData.map((item, idx) => (
                <Grid key={idx} item lg={3} md={3} xs={6} >
                    <Paper sx={{
                        width: "100%",
                        height: "100%",
                        display: 'flex',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scaleY(1.04)',
                        },
                        alignItems: "center"
                    }} >
                        <img style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                        }} src={item.Image} alt="Branch Img" />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}

export default Branch