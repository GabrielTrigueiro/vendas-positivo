import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "core/hooks/reduxHooks";
import { getUser, logout } from "core/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // * get user infos
  const dispatch = useAppDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  // * regex to get only the first name
  const fullName = basicUserInfo?.name || "";
  const firstNameMatch = fullName.match(/^(\S+)/);
  const firstName = firstNameMatch ? firstNameMatch[1] : "";

  // * menu states
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    handleLogout();
  };

  // * navigate and translate user
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  React.useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser);
    }
  }, [basicUserInfo]);

  return (
    <AppBar sx={{ width: "100%", background: "#fff" }} position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                gap: 1,
              }}
            >
              <Typography>Bem vindo de volta, {firstName}</Typography>
              <Divider flexItem light sx={{ height: 20 }} />
              <Tooltip title="Opções">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography alignItems={"center"}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
