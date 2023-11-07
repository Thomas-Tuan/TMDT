import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
    Button,
    Grid,
    List,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { FooterTitle, SubscribeTf } from "../../styles/footer";
import "../../styles/footer/style.scss";
import { Colors } from "../../styles/theme";

export default function Footer() {
    return (
        <Box
            sx={{
                background: Colors.black,
                color: Colors.white,
                p: { xs: 4, md: 10 },
                pt: 12,
                pb: 12,
                fontSize: { xs: '14px', md: '16px' }
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} lg={4} sm={3} >
                    <FooterTitle
                        sx={{
                            fontWeight: "bold", fontSize: '30px', letterSpacing: 10,
                        }}
                        variant="body1">Nine Home</FooterTitle>
                    <Typography variant="caption2">
                        Copyright©2023 by Nine Home. All rights reserved
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            color: Colors.dove_gray,
                        }}
                    >
                        <FacebookIcon sx={{ mr: 1 }} />
                        <TwitterIcon sx={{ mr: 1 }} />
                        <InstagramIcon />
                    </Box>
                </Grid>
                <Grid item md={6} lg={2} sm={3} >
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="body" fontWeight="bold" textTransform="uppercase">
                                Trang chủ
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="body" fontWeight="bold" textTransform="uppercase">
                                Sản phẩm
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="body" fontWeight="bold" textTransform="uppercase">
                                Giới thiệu
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="body" fontWeight="bold" textTransform="uppercase">
                                Liên hệ
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2} sm={3} >
                    <FooterTitle variant="body">Phương thức thanh toán</FooterTitle>
                    <Box sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center"
                    }} >
                        <img className="imgPaid imgPaid__MCard" src={require("../../asset/images/Home/mastercard.png")} width={60} alt="mastercard" />
                        <img className="imgPaid imgPaid__Visa" src={require("../../asset/images/Home/visa.png")} width={60} alt="visa" />
                    </Box>
                </Grid>
                <Grid item md={6} lg={4} sm={3} >
                    <FooterTitle variant="body">nhận bản tin</FooterTitle>
                    <Stack>
                        <SubscribeTf
                            color="warning"
                            label="Vui lòng nhập Email của bạn"
                            variant="filled"
                        />
                        <Button
                            startIcon={<SendIcon sx={{ color: Colors.white }} />}
                            sx={{ mt: 4, mb: 4 }}
                            color="warning"
                            variant="contained"
                        >
                            Gửi ngay
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
