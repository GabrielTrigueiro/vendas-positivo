import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/reduxHooks";
import { logout, getUser } from "../../core/redux/slices/authSlice";

const Dashboard = () => {


  return (
    <Typography>Dashboard</Typography>

  );
};

export default Dashboard;
