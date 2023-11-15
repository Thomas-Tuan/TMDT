import {
  Box, Toolbar
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  AppbarContainer,
  MyList
} from "../../styles/appbar";
import Actions from "./actions";
import { ImagesBg } from "../../asset";

export default function AppbarDesktop({ matches }) {

  return (
    <AppbarContainer>
      <Toolbar sx={{
        width: '250px',
        height: '100px',
      }} >
        <Box
          component={Link}
          to="/"
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            mt: "16px",
            backgroundImage: `url(${ImagesBg.logoBg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        ></Box>
      </Toolbar>
      <MyList type="row">
        <Navbar />
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
