import { Box, Grid, Stack, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";


export default function Banner() {
  const bannerData = [
    {
      Id: "cireTrvdon",
      Title: "CIRE TRVDON",
      Image: require("../../asset/images/banner1.jpg"),
    },
    {
      Id: "arcahorn",
      Title: "ARCAHORN",
      Image: require("../../asset/images/banner5.jpg"),
    },

  ]

  return (
    <Grid container >
      {bannerData.map((item, idx) => (
        <Grid key={item.Id} item lg={6} md={6} xs={12} sx={{
          height: "50vh"
        }}>
          <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            paddingBottom: 2,
            paddingLeft: 2
          }} >
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${item.Image})`,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scaleX(1.04)',
              },
            }} />
            <Stack
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              mb={3}
            >
              <Typography sx={{
                color: Colors.white,
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "36px",
                letterSpacing: 2.25,
                zIndex: 1,
              }}>
                {item.Title}
              </Typography>
              <Typography sx={{
                color: Colors.white,
                textTransform: "uppercase",
                zIndex: 1,
              }}>
                Tìm hiểu thêm
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
