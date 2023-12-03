import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/reduxHooks";
import { logout, getUser } from "../../core/redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser);
    }
  }, [basicUserInfo]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Typography>Dashboard</Typography>
      <Typography>Email: {basicUserInfo?.email}</Typography>
      <Typography>Nome: {basicUserInfo?.name}</Typography>
      <Link to={"login"}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Link>
    </>
  );
};

export default Dashboard;
