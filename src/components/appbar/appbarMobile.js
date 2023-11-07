import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton } from "@mui/material";
import { images } from "../../asset";
import { useUIContext } from "../../context/ui";
import { AppbarContainer } from "../../styles/appbar";
import { Colors } from "../../styles/theme";
import Actions from "./actions";

export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon sx={{
          color: Colors.white,
          justifyContent: "center",
        }} />
      </IconButton>
      <Box
        sx={{
          backgroundImage: `url(${images.loginBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '200px',
          height: '200px',
        }}
      />
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon sx={{
          color: Colors.white,
          justifyContent: "center",
        }} />
      </IconButton>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
