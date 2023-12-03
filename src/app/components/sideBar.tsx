import { Box, List, Typography, Card, CardMedia } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useSideBarHook from "core/hooks/sideBarHook";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SideBarItem from "./sideBarItem";
import logo from "images/assets/logo.svg";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transitionMixin(theme, theme.transitions.duration.enteringScreen),
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme, theme.transitions.duration.leavingScreen),
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
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
  ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  "& .MuiDrawer-paper": {
    ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
    border: "none",
  },
}));

function SideBar() {
  const { isOpen, onClose, onOpen } = useSideBarHook();

  return (
    <Drawer
      sx={{
        transition: "all 0.3s ease",
        textAlign: "center",
      }}
      variant={"permanent"}
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          flex: 1,
          padding: "5%"
        }}
      >
        <>
          <CardMedia
            component="img"
            alt="Logo"
            height={isOpen ? 70 : 60}
            image={logo}
            sx={{
              transition: "all 0.3s ease",
              animation: "ease-in",
              borderRadius: 2,
              objectFit: 'cover',
              boxShadow: 'none',
              ...(isOpen && {
                background: (theme) => theme.palette.primary.main,
              }),
            }}
          />

          {isOpen && <Typography fontWeight={"bold"}>Positivo Brasil</Typography>}
        </>
        <List
          sx={{
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ...(isOpen && {
              alignItems: "start"
            })
          }}
          component="nav"
        >
          <SideBarItem
            icon={VisibilityOffIcon}
            link="/dashboard"
            label="Dashboard"
          />
          <SideBarItem icon={VisibilityOffIcon} link="/vendas" label="Vendas" />
        </List>
      </Box>
      <div onClick={isOpen ? onClose : onOpen}>
        <div>{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</div>
      </div>
    </Drawer>
  );
}

export default SideBar;
