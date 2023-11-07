import { Paper, Stack } from "@mui/material"

export const ItemCarousel = (props) => {
    return (
        <Stack direction="row" justifyContent="center">
            <Paper
                sx={{
                    width: 1,
                    height: "350px",
                }}>
                <img style={{
                    width: "100%",
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                }} src={props.item.Image} alt={props.item.Name} />
            </Paper >
        </Stack>
    )
}