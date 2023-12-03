import { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <h4>Email: {basicUserInfo?.email}</h4>
      <h4>Nome: {basicUserInfo?.name}</h4>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
