import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ImagesBg } from "../../asset";
import { useUIContext } from "../../context/ui";
import { AppbarContainer } from "../../styles/appbar";
import { Colors } from "../../styles/theme";
import Actions from "./actions";

export default function AppbarMobile({ matches }) {
  const { setDrawerOpen } = useUIContext();
  const navigate = useNavigate();
  const handleNavigateToProduct = () => {
    navigate('/product')
  }

  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon sx={{
          color: Colors.white,
          justifyContent: "center",
        }} />
      </IconButton>
      <Box
        component={Link} to='/'
        sx={{
          backgroundImage: `url(${ImagesBg.logoBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '200px',
          height: '100px',
        }}
      />
      <IconButton onClick={() => {
        handleNavigateToProduct();
      }}>
        <SearchIcon sx={{
          color: Colors.white,
          justifyContent: "center",
        }} />
      </IconButton>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
