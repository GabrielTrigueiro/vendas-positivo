import { Box, List, Typography, Card, CardMedia } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useSideBarHook from "core/hooks/sideBarHook";
import SideBarItem from "./sideBarItem";
import logo from "images/assets/logo.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";

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
        textAlign: "center",
        overflow: "hidden",
      }}
      variant={"permanent"}
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          height: "100%",
          padding: "5%",
          overflow: "hidden",
        }}
      >
        <>
          <CardMedia
            component="img"
            alt="Logo"
            height={isOpen ? 70 : 60}
            image={logo}
            sx={{
              borderRadius: 2,
              objectFit: isOpen ? "contain" : "cover",
              boxShadow: "none",
              ...(isOpen && {
                background: (theme) => theme.palette.primary.main,
              }),
            }}
          />

          {isOpen && (
            <Typography
              sx={{
                transition: "all 0.5s ease",
                animation: "forwards",
                margin: 1,
              }}
              fontWeight={"bold"}
            >
              Positivo Brasil
            </Typography>
          )}
        </>
        <List
          sx={{
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            gap: 1,
            ...(isOpen && {
              alignItems: "start",
            }),
          }}
          component="nav"
        >
          <SideBarItem
            icon={DashboardIcon}
            link="/dashboard"
            label="Dashboard"
          />
          <SideBarItem icon={ReceiptIcon} link="/vendas" label="Vendas" />
        </List>
      </Box>
      <Box
        sx={{
          transition: "all 0.3s ease",

          ":hover": { background: (theme) => theme.palette.primary.main },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "7%",
        }}
        onClick={isOpen ? onClose : onOpen}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Box>
    </Drawer>
  );
}

export default SideBar;
