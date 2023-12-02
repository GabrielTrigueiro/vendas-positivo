import { Box, List, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useSideBarHook from "core/hooks/sideBarHook";
import { Link } from "react-router-dom";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transitionMixin(theme, theme.transitions.duration.enteringScreen),
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme, theme.transitions.duration.leavingScreen),
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const transitionMixin = (theme: Theme, duration: number): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderColor: "transparent",
  textAlign: "center",
  ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  "& .MuiDrawer-paper":
    (open && openedMixin(theme)) || (!open && closedMixin(theme)),
}));

function SideBar() {
  const { isOpen, onClose, onOpen } = useSideBarHook();

  return (
    <Drawer variant={"permanent"} open={isOpen} onClose={onClose}>
      <Box
        sx={{
          background: "#fefe",
          flex: 1,
        }}
      >
        <Typography fontWeight={"bold"}>Positivo Brasil</Typography>
        <List sx={{ display: "flex", flexDirection: "column" }} component="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/vendas">Vendas</Link>
        </List>
      </Box>
      <div onClick={isOpen ? onClose : onOpen}>
        <div>{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</div>
      </div>
    </Drawer>
  );
}

export default SideBar;
